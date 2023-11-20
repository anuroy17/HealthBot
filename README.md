# HealthBot

HealthBot is a conversational AI web- based chatbot powered by the Rasa framework that helps users identify potential diseases based on input symptoms. The bot engages in natural language conversations to gather symptoms from users and provides relevant disease predictions.

## Features

-A Rasa model trained using an dataset comprising of diseases and related symptoms.
-The model uses symptoms(user input) to display a list of possible diseases(output) by using an extensive medical database
-The model also displays description, symptoms, and precautions in case the user input is a disease.
-Input handling for multiple inputs(using likelihood calculations)
-Error handling for spelling errors using the pyspellchecker library(see more at: https://pypi.org/project/pyspellchecker/)

### Prerequisites

- [Python](https://www.python.org/)
- [Rasa](https://rasa.com/docs/rasa/installation)
- [pyspellchecker] (https://pypi.org/project/pyspellchecker/)
- [NodeJS] (https://nodejs.org/en/download)
