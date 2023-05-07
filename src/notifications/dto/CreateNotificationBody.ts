export interface CreateNotificationBody {
  user_id?: string;
  email?: string;
  title?: string;
  template_id?: string;
  priority?: string;
  body?: any;
  send_after?: string;
}
