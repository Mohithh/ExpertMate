import { db } from '@/app/lib/firebase';  // Updated import path
import { addDoc, collection } from 'firebase/firestore';

export async function POST(request) {
  try {
    const meetingData = await request.json();
    const docRef = await addDoc(collection(db, 'meetings'), meetingData);
    return new Response(JSON.stringify({ id: docRef.id }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}