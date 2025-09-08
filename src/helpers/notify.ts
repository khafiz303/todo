import type { Task } from "@/types/task";
export const requestNotification =  async(): Promise<boolean> => {
    if(!("Notification" in window)){
        console.warn('браузер не поддерживает уведомления')
        return false;
    }

    let permission = Notification.permission;

    if(permission === 'default'){
        permission = await Notification.requestPermission();
    }

    return permission === 'granted';
}

export const showNotification = (title: string, options?: NotificationOptions) =>{
    if(!("Notification" in window)) return;

    if(Notification.permission === 'granted'){
        new Notification(title , options)
    }

}

export const handleSchedule = async ()=> {
    const granted = await requestNotification()
    if(granted){
        setTimeout(()=> {
            showNotification('Задача добавлена', {body: 'Ваша задача успешно добавлена', icon: './icon.png'})
        }, 5000)
    }
} 

export const scheduleNotification = (task: Omit<Task, 'id'>) => {
    if (!task.notification) return;
  
    const target = new Date(task.notification).getTime();
    const now = Date.now();
    const delay = target - now;
  
    if (delay > 0) {
      setTimeout(() => {
        showNotification(task.title, {
          body: "!",
          icon: "@/assets/adn.svg",
        });
      }, delay);
    }
  };
  