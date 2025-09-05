// import React, { useState, useRef } from "react";
// import { AddTaskModal } from "@/views/ToDo/components/AddTaskModal";
// export const VoiceTask = () => {
//   const [listening, setListening] = useState(false);
//   const [transcript, setTranscript] = useState("");
//   const recognitionRef = useRef<SpeechRecognition | null>(null);


//   const startListening = () => {
//     // Проверяем поддержку
//     const SpeechRecognition =
//       (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       alert("Ваш браузер не поддерживает Web Speech API 😢");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.lang = "ru-RU"; 
//     recognition.interimResults = false;
//     recognition.maxAlternatives = 1;

//     recognition.onstart = () => setListening(true);
//     recognition.onend = () => setListening(false);

//     recognition.onresult = (event: SpeechRecognitionEvent) => {
//       const text = event.results[0][0].transcript;
//       setTranscript(text);

//       // здесь можно вызвать API добавления задачи
//       console.log("Новая задача:", text);
//       <AddTaskModal open={open} close={close} onSubmit={idk}/>
//     };

//     recognitionRef.current = recognition;
//     recognition.start();
//   };

//   return (
//     <div>
//       <button onClick={startListening} disabled={listening}>
//         {listening ? "🎤 Слушаю..." : "Начать запись"}
//       </button>
//       {transcript && <p>Распознанный текст: {transcript}</p>}
//     </div>
//   );
// };
