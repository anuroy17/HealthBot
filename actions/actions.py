import json
from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
import re
from spellchecker import SpellChecker

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

        def removePunctuations(string):
            result = ""
            for letter in string:
                if not re.match(r"[.,\/#!$%\^&\*;:{}=\-_`~()@?]", letter): 
                    result += letter
                else:
                    result += " "
            
            return result
        user_message_text = removePunctuations(user_message)
      
        user_words = user_message_text.split()  

        spell = SpellChecker()
        
        
        corrected_input = []

        for word in user_words:
            if word not in spell:                
                corrected_word = spell.correction(word)
                corrected_input.append(corrected_word)
                
                
                dispatcher.utter_message(text=f"Did you mean: '{corrected_word}'?")
                dispatcher.utter_message(text=f"Showing results for: '{corrected_word}'")
            else:
                corrected_input.append(word)




        
        all_symptoms = [symptom for entry in file_data["data"] for symptom in entry["symptoms"]]
        
        symptoms = [word for word in corrected_input if word in all_symptoms]


        for k in range(2,5):
            word_combinations = [' '.join(corrected_input[i:i+k]) for i in range(len(corrected_input) - 1)]
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
        
        
        max_likelihood = max(disease_likelihood.values())

        sorted_diseases = sorted(disease_likelihood.items(), key=lambda x: x[1], reverse=True)

        i, j, k = 0, 0, 0

        max_probabilities, sig_probabilities, min_probabilities = [], [], []

        for disease, likelihood in sorted_diseases:
            if likelihood == max_likelihood:
                i += 1
                max_probabilities.append(f"{i}. {disease} ")
            elif max_likelihood // 2 <= likelihood < max_likelihood:
                j += 1
                sig_probabilities.append(f"{j}. {disease} ")
            elif 1 <= likelihood < max_likelihood // 2:
                k += 1
                min_probabilities.append(f"{k}. {disease} ")

        if max_probabilities:
            dispatcher.utter_message("Diseases having maximum probability include:")
            dispatcher.utter_message('\n'.join(max_probabilities))


        if sig_probabilities:
            dispatcher.utter_message("Diseases having significant probability include:")
            dispatcher.utter_message('\n'.join(sig_probabilities))


        if min_probabilities:
            dispatcher.utter_message("Diseases having minimal probability include:")
            dispatcher.utter_message('\n'.join(min_probabilities))
        dispatcher.utter_message("Disclaimer:\nHealthBot is designed to provide diagnostic suggestions, but you should not rely on the information provided as a substitute for professional advice. Please be aware that the chatbot is an automated system, and it may not always provide 100% accurate information.")

       
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
                i = 1
                for statement in precautionToTake:
                    dispatcher.utter_message(text=f"{i}. {statement}")
                    i += 1
        dispatcher.utter_message("Disclaimer:\nHealthBot is designed to provide medical data, but you should not rely on the information provided as a substitute for professional advice. Please be aware that the chatbot is an automated system, and it may not always provide 100% accurate information.")
                
                
        return []
