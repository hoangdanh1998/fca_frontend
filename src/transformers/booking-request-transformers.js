export const bookingRequestTransformers = (slotIds, slots) => {
  return slotIds.map(slotId => {
    const found = slots.find(slot => slot.id === slotId);
    if (found) return { date: found.date, type: found.type };
    return null;
  });
};
