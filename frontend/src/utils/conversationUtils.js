export function getConversationGroup(updatedAt) {

  const date = new Date(updatedAt);

  const today = new Date();

  const yesterday = new Date();

  yesterday.setDate(today.getDate() - 1);

  const diffDays = Math.floor(

    (today - date) / (1000 * 60 * 60 * 24)

  );

  if (date.toDateString() === today.toDateString()) {

    return "Today";

  }

  if (date.toDateString() === yesterday.toDateString()) {

    return "Yesterday";

  }

  if (diffDays <= 7) {

    return "Previous 7 Days";

  }

  if (diffDays <= 30) {

    return "Previous 30 Days";

  }

  return "Older";

}