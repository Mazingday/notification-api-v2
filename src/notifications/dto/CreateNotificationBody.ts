export interface CreateNotificationBody {
  user_id?: string;
  email?: string;
  title?: string;
  text?: string;
  template_id?: string;
  priority?: string;
  body?: any;
  send_after?: Date;
  to?: string;
  type?: string;
  data?: string;
  isDialog?: boolean;
  isFriendRequest?: boolean;
  navigateTo?: string;
  dialogType?: string;
}
