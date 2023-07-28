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
        
        dispatcher.utter_message(text="Possible Diseases:")
        
            
        with open("symptoms.json", "r") as file:
            file_data = json.load(file)
        #symptom = next(tracker.get_latest_entity_values("symptom"), None)
        
        symptom = tracker.get_slot("symptom")
        count = 1
            
        for index in range(41):
            if symptom in file_data["data"][index]["symptoms"]:
                disease = file_data["data"][index]["name"]
                dispatcher.utter_message(text = f"{count}. {disease}")
                count += 1
                
        return []
