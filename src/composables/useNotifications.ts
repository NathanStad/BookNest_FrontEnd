import { ref } from 'vue';

export interface Notification {
  id: number;
  title: string;
  message: string;
  date: Date;
}

const notifications = ref<Notification[]>([
  {
    id: 1,
    title: 'Nouveau livre du jour !',
    message: 'Découvrez "Le Seigneur des Anneaux" de J.R.R. Tolkien. Une histoire épique qui ne demande qu\'à être dévorée ⭐',
    date: new Date()
  },
  {
    id: 2,
    title: 'Nouveau livre du jour !',
    message: 'Découvrez "Dune" de Frank Herbert. Une histoire captivante qui ne demande qu\'à être dévorée 🌟',
    date: new Date(Date.now() - 24 * 60 * 60 * 1000)
  },
  {
    id: 3,
    title: 'Nouveau livre du jour !',
    message: 'Découvrez "Fondation" de Isaac Asimov. Une histoire fascinante qui ne demande qu\'à être dévorée ✨',
    date: new Date(Date.now() - 48 * 60 * 60 * 1000)
  }
]);

export function useNotifications() {
  const addNotification = (title: string, message: string) => {
    notifications.value.unshift({
      id: Date.now(),
      title,
      message,
      date: new Date()
    });
  };

  const clearNotifications = () => {
    notifications.value = [];
  };

  return {
    notifications,
    addNotification,
    clearNotifications
  };
}