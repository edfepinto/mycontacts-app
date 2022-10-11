import EventManager from '../lib/EventManager';

export const tostEventManager = new EventManager();

export default function toast({ type, text }) {
  tostEventManager.emit('addtoast', { type, text });
}
