import json
from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher

class FindDisease(Action):
    def name(self) -> Text:
        return "action_findDisease"
    
    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        dispatcher.utter_message(text="Possible Diseases:")
        
        with open("symptoms.json", "r") as file:
            file_data = json.load(file)
        
        user_message = tracker.latest_message.get("text")  
        user_words = user_message.split()  
        
        all_symptoms = [symptom for entry in file_data["data"] for symptom in entry["symptoms"]]
        
        symptoms = [word for word in user_words if word in all_symptoms]

        for k in range(2,5):
            word_combinations = [' '.join(user_words[i:i+k]) for i in range(len(user_words) - 1)]
        for combo in word_combinations:
            if combo in all_symptoms:
                symptoms.append(combo)
        
        if not symptoms:
            dispatcher.utter_message("No symptoms found in your input. Please provide some symptoms.")
            return []
        
        disease_likelihood = {}  
        
        for entry in file_data["data"]:
            disease = entry["name"]
            symptom_list = entry["symptoms"]
            
            # Calculate a likelihood score for the disease based on the presence of symptoms
            likelihood = sum(1 for symptom in symptoms if symptom in symptom_list)
            
            if likelihood > 0:  
                disease_likelihood[disease] = likelihood
        
        
        sorted_diseases = sorted(disease_likelihood.items(), key=lambda x: x[1], reverse=True)
        
        count = 1
        for disease, likelihood in sorted_diseases:
            dispatcher.utter_message(text=f"{count}. {disease} (Likelihood: {likelihood})")
            count += 1
        
        return []


    
class giveMoreInformation(Action):
    def name(self) -> Text:
        return "action_giveMoreInformation"
    
    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        dispatcher.utter_message(text = "Here is the more information about the disease:")
        
        with open("symptoms.json", "r") as file:
            file_data = json.load(file)
        
        input_disease = tracker.get_slot("disease")
        
        for index in range(41):
            if input_disease == file_data["data"][index]["name"]:
                information = file_data["data"][index]["description"]
                dispatcher.utter_message(text = f"{information}")
                dispatcher.utter_message(text = "Things to do to avoid severity:")
                precautionToTake = file_data["data"][index]["precautions"]
                for statement in precautionToTake:
                    dispatcher.utter_message(text = f"{statement}")
                
        return []
