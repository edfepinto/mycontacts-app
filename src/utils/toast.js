import EventManager from '../lib/EventManager';

export const tostEventManager = new EventManager();

export default function toast({ type, text, duration }) {
  tostEventManager.emit('addtoast', { type, text, duration });
}
