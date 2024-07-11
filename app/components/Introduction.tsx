import React from "react";

function Introduction() {
  return (
    <div className="flex flex-col h-full space-y-4 p-4 overflow-auto">
      <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
       welcome
      </h1>
      <p className="text-gray-700">
       
      </p>
      <h2 className="text-xl font-semibold text-gray-900">
       
      </h2>
      <p className="text-gray-600">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore odit id quae eaque quam tempore iste libero assumenda nam aperiam ea voluptates, veritatis quo harum. Quod dolor eligendi laudantium officiis?
      </p>
      <h3 className="text-lg font-semibold text-gray-900">Explore Use Cases</h3>
      <ul className="list-disc list-inside text-gray-600 flex-grow">
        <li>Symptom Triage: Chatbots assess symptoms, guiding users on when to seek medical help, enhancing healthcare access and early intervention.</li>
        <li>Personalized Education: Deliver tailored health information, empowering users with knowledge for informed decisions and preventive care.</li>
        
        <li>
        Medication Aid: Assist with medication reminders, dosage information, and refills, promoting adherence and better health outcomes.
        </li>
      </ul>
      <div className="mt-auto">
        <div className="flex justify-center items-center">
          <p className="text-gray-500 text-sm">
            Made  by Rishabh Gupta
           
          </p>
        </div>
      </div>
    </div>
  );
}

export default Introduction;
