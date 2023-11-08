import json
from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher


class findDisease(Action):
    def name(self) -> Text:
        return "action_findDisease"
    
    
    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        dispatcher.utter_message(text="Here is the list of possible Diseases according to the symptoms you mentioned:")
        
            
        with open("symptoms.json", "r") as file:
            file_data = json.load(file)
        
        input_symptom = tracker.get_slot("symptom")
        count = 1
            
        for index in range(41):
            if input_symptom in file_data["data"][index]["symptoms"]:
                disease = file_data["data"][index]["name"]
                dispatcher.utter_message(text = f"{count}. {disease}")
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
