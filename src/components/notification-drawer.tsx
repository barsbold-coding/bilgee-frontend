'use client'

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "./ui/button";
import { 
  Drawer, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerTrigger 
} from "./ui/drawer";
import { notificationAPI } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { Notification } from "@/types/api.types";
import { Badge } from "./ui/badge";

export function NotificationDrawer() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const fetchNotifications = async () => {
    try {
      const response = await notificationAPI.getAll();
      setNotifications(response.data.sort((a, b) => a.createdAt < b.createdAt));
      setUnreadCount(response.data.filter((e) => !e.seen).length);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    if (isOpen && notifications.length > 0) {
      const markNotificationsAsSeen = async () => {
        try {
          await Promise.all(
            notifications
              .filter(notification => !notification.seenAt)
              .map(notification => 
                notificationAPI.markAsSeen(notification.id)
              )
          );
        } catch (error) {
          console.error("Failed to mark notifications as seen:", error);
        }
      };
      
      markNotificationsAsSeen();
    }
  }, [isOpen, notifications]);

  return (
      <Drawer open={isOpen} onOpenChange={setIsOpen} direction="right">
        <DrawerTrigger asChild>
          <Button variant="ghost" className="relative p-2">
            <Bell />
            {unreadCount > 0 && (
              <Badge 
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-red-500 text-white text-xs"
              >
                {unreadCount}
              </Badge>
            )}
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-[100vh]">
          <DrawerHeader>
            <DrawerTitle>Мэдэгдлүүд</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                Танд одоогоор мэдэгдэл байхгүй байна
              </div>
            ) : (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-4 rounded-lg border ${!notification.seenAt ? 'bg-blue-50' : ''}`}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold">{notification.title}</h3>
                      {notification.seenAt && (
                        <span className="text-xs text-gray-500">
                          {formatDate(notification.seenAt)}
                        </span>
                      )}
                    </div>
                    <p className="text-sm mt-1">{notification.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DrawerContent>
      </Drawer>
  );
}
