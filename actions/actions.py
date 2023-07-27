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
            td = json.load(file)
        #symptom = next(tracker.get_latest_entity_values("symptom"), None)
        
        symptom = tracker.get_slot("symptom")
            
        for iterator in range(1, 41):
            if symptom in td["data"][iterator]["symptoms"]:
                disease = td["data"][iterator]["name"]
                dispatcher.utter_message(text = f"{iterator}. {disease}")
                
        return []
