import React from "react";
import { DndContext, DragOverlay, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DealCard from "@/components/molecules/DealCard";
import Card from "@/components/atoms/Card";
import { cn } from "@/utils/cn";

const SortableDealCard = ({ deal, contact }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: deal.Id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <DealCard deal={deal} contact={contact} isDragging={isDragging} />
    </div>
  );
};

const PipelineColumn = ({ stage, deals, contacts }) => {
  const stageDeals = deals.filter(deal => deal.stage === stage.name);
  const totalValue = stageDeals.reduce((sum, deal) => sum + deal.value, 0);

  return (
    <Card className="p-4 min-h-[600px]">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-900">{stage.name}</h3>
          <span className="text-sm text-gray-500">{stageDeals.length}</span>
        </div>
        <div className="text-sm text-gray-600">
          ${totalValue.toLocaleString()}
        </div>
      </div>

      <SortableContext items={stageDeals.map(deal => deal.Id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-3">
          {stageDeals.map((deal) => {
            const contact = contacts.find(c => c.Id === deal.contactId);
            return (
              <SortableDealCard
                key={deal.Id}
                deal={deal}
                contact={contact}
              />
            );
          })}
        </div>
      </SortableContext>
    </Card>
  );
};

const PipelineBoard = ({ 
  stages, 
  deals, 
  contacts,
  onDealMove,
  className,
  ...props 
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeDeal = deals.find(deal => deal.Id === activeId);
    const overDeal = deals.find(deal => deal.Id === overId);

    if (activeDeal && overDeal && activeDeal.stage !== overDeal.stage) {
      onDealMove?.(activeDeal, overDeal.stage);
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto",
        className
      )} {...props}>
        {stages.map((stage) => (
          <PipelineColumn
            key={stage.name}
            stage={stage}
            deals={deals}
            contacts={contacts}
          />
        ))}
      </div>
    </DndContext>
  );
};

export default PipelineBoard;