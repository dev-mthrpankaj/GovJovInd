(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "english-narration-set-1";

    const questions = [
        {
            id: `${quizId}-q01`,
            topic: "Narration",
            difficulty: "medium",
            question: "The captain said to the soldiers, \"Follow the enemy.\"",
            options: [
                "The captain commanded his soldiers to follow the enemy.",
                "The captain requested his soldiers to follow the enemy.",
                "The captain charged his soldiers to followed the enemy.",
                "The captain said his soldiers to follow the enemy."
            ],
            correctAnswer: 0,
            explanation: "For an order or command, said to changes to commanded/ordered and the imperative verb changes to to + V1."
        },
        {
            id: `${quizId}-q02`,
            topic: "Narration",
            difficulty: "medium",
            question: "Rakesh said, \"Wow! What a beautiful house.\"",
            options: [
                "Rakesh exclaimed with surprise that it was must be beautiful house.",
                "Rakesh told that it had been a beautiful house.",
                "Rakesh exclaimed that it was a beautiful house.",
                "Rakesh exclaimed with sorrow that it was a beautiful house."
            ],
            correctAnswer: 2,
            explanation: "Exclamatory sentence with surprise changes to exclaimed that."
        },
        {
            id: `${quizId}-q03`,
            topic: "Narration",
            difficulty: "medium",
            question: "He said to the mechanic, \"Will you have the car ready by tomorrow morning?\"",
            options: [
                "He asked the mechanic if he would have the car ready by the next morning.",
                "He told the mechanic if he will have the car ready for the next morning.",
                "He asked the mechanic if he will have the car ready by the previous morning.",
                "He said the mechanic whether he would has the car ready by the following morning."
            ],
            correctAnswer: 0,
            explanation: "Yes/No question changes to asked + object + if/whether. Will changes to would and tomorrow morning changes to the next morning."
        },
        {
            id: `${quizId}-q04`,
            topic: "Narration",
            difficulty: "medium",
            question: "Anil said to Ria, \"I know where everything is kept in the kitchen.\"",
            options: [
                "Anil told Ria that he knows where everything was kept in the kitchen.",
                "Anil told Ria that he knew where everything is kept in the kitchen.",
                "Anil asked Ria that he knows where everything was kept in the kitchen.",
                "Anil told Ria that he knew where everything was kept in the kitchen."
            ],
            correctAnswer: 3,
            explanation: "Said to changes to told. I changes to he. Know changes to knew. Is kept changes to was kept."
        },
        {
            id: `${quizId}-q05`,
            topic: "Narration",
            difficulty: "medium",
            question: "I suggested to my brother that we should go to the hills for a change.",
            options: [
                "I requested to my brother, \"We should go to the hills for a change.\"",
                "I said to my brother, \"We shall go to the hills for a change.\"",
                "I said to my brother, \"Shall we go to the hills for a change?\"",
                "I said to my brother, \"Let us go to the hills for a change.\""
            ],
            correctAnswer: 3,
            explanation: "Suggested that we should is changed into direct speech with Let us."
        },
        {
            id: `${quizId}-q06`,
            topic: "Narration",
            difficulty: "medium",
            question: "The old man prayed to God to help him in his hour of sorrow.",
            options: [
                "The old man said, \"O God, help me in his hour of sorrow.\"",
                "The old man said, \"God must help him in his hour of sorrow.\"",
                "The old man said, \"O God, help me in my hour of sorrow.\"",
                "The old man said, \"O God, help him in my hour of sorrow.\""
            ],
            correctAnswer: 2,
            explanation: "Prayer in direct speech commonly uses O God. Pronouns change according to the speaker."
        },
        {
            id: `${quizId}-q07`,
            topic: "Narration",
            difficulty: "medium",
            question: "He said to his friend, \"Let us leave for the trek tomorrow.\"",
            options: [
                "He suggested to his friend that they should leave for the trek the next day.",
                "He told his friend to leave for the trek the next day.",
                "He suggested his friend that let us leave for the trek tomorrow.",
                "He suggested to his friend to leave for the trek the next day."
            ],
            correctAnswer: 0,
            explanation: "Let us for proposal/suggestion changes to suggested that they should. Tomorrow changes to the next day."
        },
        {
            id: `${quizId}-q08`,
            topic: "Narration",
            difficulty: "medium",
            question: "You said, \"Priya kept watching television till her mother exploded at her.\"",
            options: [
                "You said that Priya had kept watching television till her mother exploded at her.",
                "You said that Priya kept watching television till her mother had exploded at her.",
                "You said that Priya kept watching television till her mother exploded at her.",
                "You said that Priya had kept watching television till her mother had exploded at her."
            ],
            correctAnswer: 2,
            explanation: "The original sentence can remain unchanged because the time relation is already clear."
        },
        {
            id: `${quizId}-q09`,
            topic: "Narration",
            difficulty: "medium",
            question: "I asked my friend how one could be merry when everything was so messed up.",
            options: [
                "I said to my friend, \"Could one be merry when everything is so messed up?\"",
                "I asked to my friend, \"How can one be merry when everything was so messed up?\"",
                "I said to my friend, \"How can one be merry when everything is so messed up?\"",
                "I said to my friend, \"How one could be merry when everything was so messed up?\""
            ],
            correctAnswer: 2,
            explanation: "In direct speech, the indirect question returns to question form: How can one...?"
        },
        {
            id: `${quizId}-q10`,
            topic: "Narration",
            difficulty: "medium",
            question: "He says that he will clear all his dues by the following month.",
            options: [
                "He says, \"I will clear all my dues by next month.\"",
                "He says, \"I will clear all his dues by next month.\"",
                "He said, \"I will clear all my dues by next month.\"",
                "He said, \"I would clear all my dues by next month.\""
            ],
            correctAnswer: 0,
            explanation: "With says, tense usually does not backshift. He changes to I and following month becomes next month."
        },
        {
            id: `${quizId}-q11`,
            topic: "Narration",
            difficulty: "medium",
            question: "Ankit said to Ashna, \"Do you know that the annual meeting has been postponed?\"",
            options: [
                "Ankit asked Ashna that do you know that the annual meeting has been postponed.",
                "Ankit asked Ashna if she would be knowing that the annual meeting had been postponed.",
                "Ankit asked Ashna if she had known that the annual meeting was postponed.",
                "Ankit asked Ashna if she knew that the annual meeting had been postponed."
            ],
            correctAnswer: 3,
            explanation: "Yes/No question changes to asked + if. Do you know becomes she knew and has been postponed becomes had been postponed."
        },
        {
            id: `${quizId}-q12`,
            topic: "Narration",
            difficulty: "medium",
            question: "I said to him, \"Please stay here tonight.\"",
            options: [
                "I asked him if he would stay there that night.",
                "I requested him to please stay there tonight.",
                "I requested him to stay there that night.",
                "I asked him to please stay here that night."
            ],
            correctAnswer: 2,
            explanation: "A polite request changes to requested + object + to + V1. Here changes to there and tonight changes to that night."
        },
        {
            id: `${quizId}-q13`,
            topic: "Narration",
            difficulty: "medium",
            question: "Isha told Shivani that they didn't need to buy tickets for the match as she had been given free passes for two.",
            options: [
                "Isha said to Shivani, \"We didn't need to buy tickets for the match as I am given free passes for two.\"",
                "Isha said to Shivani, \"We don't need to buy tickets for the match as I have been given free passes for two.\"",
                "Isha said to Shivani, \"They didn't need to buy tickets for the match as she was given free passes for two.\"",
                "Isha said to Shivani, \"They didn't need to buy tickets for the match as I am given free passes for two.\""
            ],
            correctAnswer: 1,
            explanation: "Direct speech restores present tense and correct pronouns: we, don't, I have been."
        },
        {
            id: `${quizId}-q14`,
            topic: "Narration",
            difficulty: "medium",
            question: "She exclaimed with regret that she had acted very foolishly.",
            options: [
                "\"Oh! I regret having acted foolishly,\" she said.",
                "\"Alas! How foolishly I have acted,\" she said.",
                "\"I have acted foolishly,\" she said.",
                "\"Ah! Have I acted foolishly?\" she said."
            ],
            correctAnswer: 1,
            explanation: "Regret is expressed with Alas. The indirect past perfect returns to present perfect in direct speech."
        },
        {
            id: `${quizId}-q15`,
            topic: "Narration",
            difficulty: "medium",
            question: "She said, \"If only I could relive my past!\"",
            options: [
                "She said that she could relive her past.",
                "She wished that she could relive her past.",
                "She wished if she could relive my past.",
                "She wished that if she could relive her past."
            ],
            correctAnswer: 1,
            explanation: "If only expresses a wish; in indirect speech it becomes wished that."
        },
        {
            id: `${quizId}-q16`,
            topic: "Narration",
            difficulty: "medium",
            question: "He said, \"Two and two make four.\"",
            options: [
                "He says that two and two made four.",
                "He said that two and two make four.",
                "He says that two and two make four.",
                "He said that two and two made four."
            ],
            correctAnswer: 1,
            explanation: "Universal truth or mathematical fact remains in present tense in indirect speech."
        },
        {
            id: `${quizId}-q17`,
            topic: "Narration",
            difficulty: "medium",
            question: "Select the most appropriate option in direct speech: The principal said to me that I was in-charge of the admission cell.",
            options: [
                "The principal said to me, \"You are in-charge of the admission cell.\"",
                "The principal say me, \"You are in-charge of the admission cell.\"",
                "The principal said to I, \"You are in-charge of the admission cell.\"",
                "The principal said me, You are in-charge of the admission cell."
            ],
            correctAnswer: 0,
            explanation: "Said to me is correct and in direct speech I changes back to you."
        },
        {
            id: `${quizId}-q18`,
            topic: "Narration",
            difficulty: "medium",
            question: "He said, \"I bought this book for my brother.\"",
            options: [
                "He said that he buy this book for his brother.",
                "He said that he had bought that book for his brother.",
                "He said that he has bought this book for his brother.",
                "He said that he bought this book for his brother."
            ],
            correctAnswer: 1,
            explanation: "Simple past generally changes to past perfect. This changes to that."
        },
        {
            id: `${quizId}-q19`,
            topic: "Narration",
            difficulty: "medium",
            question: "\"We will have a thorough search before opening the room,\" the inspector told his subordinates.",
            options: [
                "The inspector told his subordinates that they would be having a thorough search before opening the room.",
                "The inspector told his subordinates that they can have a thorough search before opening the room.",
                "The inspector told his subordinates that they will had a thorough search before opening the room.",
                "The inspector told his subordinates that they would have a thorough search before opening the room."
            ],
            correctAnswer: 3,
            explanation: "Will changes to would. We changes according to the inspector and his subordinates, so it becomes they."
        },
        {
            id: `${quizId}-q20`,
            topic: "Narration",
            difficulty: "medium",
            question: "The teacher said, \"She had started the fight.\"",
            options: [
                "The teacher complained that she has started the fight.",
                "The teacher said that she had started the fight.",
                "The teacher ordered that she had started the fight.",
                "The teacher said that she has started the fight."
            ],
            correctAnswer: 1,
            explanation: "Past perfect usually remains past perfect in indirect speech."
        },
        {
            id: `${quizId}-q21`,
            topic: "Narration",
            difficulty: "medium",
            question: "The ticket collector asked the passengers where their tickets were.",
            options: [
                "The ticket collector said to the passengers, \"Where your tickets were?\"",
                "The ticket collector said to the passengers, \"Where were your tickets?\"",
                "The ticket collector demanded the passengers, \"Show me your tickets\"",
                "The ticket collector said to the passengers, \"Where are your tickets?\""
            ],
            correctAnswer: 3,
            explanation: "In direct speech, the question returns to present form: Where are your tickets?"
        },
        {
            id: `${quizId}-q22`,
            topic: "Narration",
            difficulty: "medium",
            question: "Mrs. Mane said that she regretted having supplied us with an inferior brand of TV set and was ready to apologise for that.",
            options: [
                "Mrs. Mane said, \"I regret supplying you with an inferior brand of TV set and I am ready to apologise for that.\"",
                "Mrs. Mane said, \"I am regretting having supplied you with an inferior brand of TV set and I am ready to apologise for that.\"",
                "Mrs. Mane said, \"I regret having supplied you with an inferior brand of TV set and I am ready to apologise for that.\"",
                "Mrs. Mane said, \"I regret to supply you with an inferior brand of TV set and I am ready to apologise for that.\""
            ],
            correctAnswer: 2,
            explanation: "Regretted having supplied changes back to regret having supplied in direct speech."
        },
        {
            id: `${quizId}-q23`,
            topic: "Narration",
            difficulty: "medium",
            question: "Bibiya asked the doctor if she could get the discharge in the morning.",
            options: [
                "Bibiya asked the doctor, \"Can I get the discharge in the morning?\"",
                "Bibiya asked the doctor, \"How can I get the discharge in the morning?\"",
                "Bibiya asked the doctor, \"Could I have got the discharge in the morning?\"",
                "Bibiya asked the doctor, \"If I can get the discharge in the morning?\""
            ],
            correctAnswer: 0,
            explanation: "If she could changes back to Can I in direct speech."
        },
        {
            id: `${quizId}-q24`,
            topic: "Narration",
            difficulty: "medium",
            question: "She asked, \"Where do you live?\"",
            options: [
                "She asked me where I had lived.",
                "She told me where I lived.",
                "She asked me where I had been living.",
                "She asked me where I lived."
            ],
            correctAnswer: 3,
            explanation: "WH-question changes to asked + object + wh-word + subject + verb. Do live changes to lived."
        },
        {
            id: `${quizId}-q25`,
            topic: "Narration",
            difficulty: "medium",
            question: "Anant said that he was feeling sleepy.",
            options: [
                "Anant said, \"He was feeling sleepy.\"",
                "Anant said, \"I was feeling sleepy.\"",
                "\"I was feeling sleepy,\" says Anant.",
                "Anant said, \"I am feeling sleepy.\""
            ],
            correctAnswer: 3,
            explanation: "In direct speech, he changes back to I and was feeling changes to am feeling."
        },
        {
            id: `${quizId}-q26`,
            topic: "Narration",
            difficulty: "medium",
            question: "Bidding farewell to me, my juniors wished me a bright and successful career ahead.",
            options: [
                "Bidding farewell to me, my juniors inquired, \"Wish you a bright and successful career ahead.\"",
                "Bidding farewell to me, my juniors said to themselves, \"Wish you a bright and successful career ahead.\"",
                "Bidding farewell to me, my juniors said to me, \"Wish you a bright and successful career ahead.\"",
                "Bidding farewell to me, my juniors wish me, \"Wish you a bright and successful career ahead.\""
            ],
            correctAnswer: 2,
            explanation: "Wished me is correctly expressed in direct speech as said to me, \"Wish you...\"."
        },
        {
            id: `${quizId}-q27`,
            topic: "Narration",
            difficulty: "medium",
            question: "Prem said that he had been listening to music for an hour.",
            options: [
                "Prem said, \"I have been listening to music for an hour.\"",
                "Prem said, \"He has listening to music for an hour.\"",
                "Prem said, \"He has be listened to music for an hour.\"",
                "Prem said, \"I had listened to music for an hour.\""
            ],
            correctAnswer: 0,
            explanation: "Past perfect continuous in indirect speech changes back to present perfect continuous in direct speech."
        },
        {
            id: `${quizId}-q28`,
            topic: "Narration",
            difficulty: "medium",
            question: "He said, \"I will see you now.\"",
            options: [
                "He said he will see you now.",
                "He said he will see me now.",
                "He said he would see me then.",
                "He said I will see you now."
            ],
            correctAnswer: 2,
            explanation: "Will changes to would, you changes according to the listener, and now changes to then."
        },
        {
            id: `${quizId}-q29`,
            topic: "Narration",
            difficulty: "medium",
            question: "Aravind said, \"Let us wait for the cab.\"",
            options: [
                "Aravind proposed that they should wait for the cab.",
                "Aravind proposed that they should has wait for the cab.",
                "Aravind proposes that let we waited for the cab.",
                "Aravind propose that they should been wait for the cab."
            ],
            correctAnswer: 0,
            explanation: "Let us for proposal changes to proposed that they should."
        },
        {
            id: `${quizId}-q30`,
            topic: "Narration",
            difficulty: "medium",
            question: "Arya said, \"I am very busy now.\"",
            options: [
                "Arya said that she is being very busy now.",
                "Arya said that she is be very busy now.",
                "Arya said that she was very busy then.",
                "Arya said that she was being very busy then."
            ],
            correctAnswer: 2,
            explanation: "Am changes to was and now changes to then."
        },
        {
            id: `${quizId}-q31`,
            topic: "Narration",
            difficulty: "medium",
            question: "Madhav applauded her, saying that she had done well.",
            options: [
                "Madhav say, \"Bravo! You have done well\".",
                "Madhav said, \"Bravo! You have done well\".",
                "Madhav said, \"Bravo! You been done well\".",
                "Madhav say, \"Bravo! You have be done well\"."
            ],
            correctAnswer: 1,
            explanation: "Applauded is expressed by Bravo in direct speech. Had done changes back to have done."
        },
        {
            id: `${quizId}-q32`,
            topic: "Narration",
            difficulty: "medium",
            question: "My son exclaimed with joy that it was an attractive site.",
            options: [
                "My son said, \"It is an attractive site.\"",
                "My son said, \"What an attractive site it is!\"",
                "My son said, \"What an attractive site it was!\"",
                "My son said, \"It was an attractive site.\""
            ],
            correctAnswer: 1,
            explanation: "Exclamation with joy changes back to What an attractive site it is!"
        },
        {
            id: `${quizId}-q33`,
            topic: "Narration",
            difficulty: "medium",
            question: "The sage said, \"Man proposes and God disposes.\"",
            options: [
                "The sage said that man proposes and God disposes.",
                "The sage said that man propose and God dispose.",
                "The sage said that man proposed and God disposed.",
                "The sage said that man had proposed and God had disposed."
            ],
            correctAnswer: 0,
            explanation: "Proverbs and universal truths do not change tense."
        },
        {
            id: `${quizId}-q34`,
            topic: "Narration",
            difficulty: "medium",
            question: "The father said to his daughter, \"Your mother will be waiting for me.\"",
            options: [
                "The father told his daughter that her mother was waiting for me.",
                "The father told his daughter that her mother would be waiting for him.",
                "The father told his daughter that my mother would be waiting for him.",
                "The father told his daughter that her mother will be waiting for him."
            ],
            correctAnswer: 1,
            explanation: "Will be changes to would be. Your mother becomes her mother and me becomes him."
        },
        {
            id: `${quizId}-q35`,
            topic: "Narration",
            difficulty: "medium",
            question: "The mayor said to the marshals, \"Don’t conduct any drill tomorrow.\"",
            options: [
                "The mayor ordered the marshals not to conduct any drill the previous day.",
                "The mayor ordered the marshals not to conduct any drill tomorrow.",
                "The mayor ordered the marshals not to conducted any drill the next day.",
                "The mayor ordered the marshals not to conduct any drill the next day."
            ],
            correctAnswer: 3,
            explanation: "Negative command changes to ordered + object + not to + V1. Tomorrow changes to the next day."
        },
        {
            id: `${quizId}-q36`,
            topic: "Narration",
            difficulty: "medium",
            question: "My mother said, \"I am meeting your father today.\"",
            options: [
                "My mother said that she were meeting my father that day.",
                "My mother says that she was meeting my father today.",
                "The mother said that she has been meeting my father that day.",
                "My mother said that she was meeting my father that day."
            ],
            correctAnswer: 3,
            explanation: "Am meeting changes to was meeting and today changes to that day."
        },
        {
            id: `${quizId}-q37`,
            topic: "Narration",
            difficulty: "medium",
            question: "The surgeon says, \"You should get anaesthesia for the surgery.\"",
            options: [
                "The surgeon says you should get anaesthesia for the surgery.",
                "The surgeon said that I shall get anaesthesia for the surgery.",
                "The surgeon says that I should have got anaesthesia for the surgery.",
                "The surgeon says that I should get anaesthesia for the surgery."
            ],
            correctAnswer: 3,
            explanation: "With says, tense does not backshift. You changes according to the listener, so it becomes I."
        },
        {
            id: `${quizId}-q38`,
            topic: "Narration",
            difficulty: "medium",
            question: "The student said to her, \"I don’t remember your name.\"",
            options: [
                "The student said to her that I did not remember her name.",
                "The student said to her that he/she cannot remember her name.",
                "The student told her that he/she did not remember her name.",
                "The student told her that he/she do not remember her name."
            ],
            correctAnswer: 2,
            explanation: "Said to changes to told. I changes to he/she and don't changes to did not."
        },
        {
            id: `${quizId}-q39`,
            topic: "Narration",
            difficulty: "medium",
            question: "She said to her, \"Please pay attention to the details.\"",
            options: [
                "She requests her that pay attention to the details.",
                "She commanded her for paying attention to the details.",
                "She requested her to pay attention to the details.",
                "She requested her that to pay attention to the details."
            ],
            correctAnswer: 2,
            explanation: "A polite request changes to requested + object + to + V1."
        },
        {
            id: `${quizId}-q40`,
            topic: "Narration",
            difficulty: "medium",
            question: "She said that she would not be coming to the school that day.",
            options: [
                "She had said \"She must not be coming to the school today.\"",
                "She said, \"You will not be coming to the school today.\"",
                "She said, \"I may not come to the school tomorrow.\"",
                "She said, \"I will not be coming to the school today.\""
            ],
            correctAnswer: 3,
            explanation: "Would not be coming changes back to will not be coming. That day changes to today."
        },
        {
            id: `${quizId}-q41`,
            topic: "Narration",
            difficulty: "medium",
            question: "Shubham said that his father was playing cricket with him.",
            options: [
                "Shubham said, \"My father played cricket with me.\"",
                "Shubham said, \"My father is playing cricket with me.\"",
                "Shubham said, \"My father was playing cricket with me.\"",
                "Shubham said, \"My father had played cricket with me.\""
            ],
            correctAnswer: 1,
            explanation: "Was playing in indirect speech changes back to is playing in direct speech."
        },
        {
            id: `${quizId}-q42`,
            topic: "Narration",
            difficulty: "medium",
            question: "He said that he would be taking a leave of absence for two weeks as there had been a death in his family.",
            options: [
                "He said \"I am going to take a leave for two weeks as there had been a death in my family\".",
                "He said, \"I would be taking a leave of absence for 2 weeks as there been a death in my family\".",
                "He said \"I will be taking a leave of absence for two week as there is a death in my family\".",
                "He said, \"I will be taking a leave of absence for two weeks as there has been a death in my family\"."
            ],
            correctAnswer: 3,
            explanation: "Would be taking changes back to will be taking and had been changes back to has been."
        },
        {
            id: `${quizId}-q43`,
            topic: "Narration",
            difficulty: "medium",
            question: "Nita says, \"I have heard the podcast before.\"",
            options: [
                "Nita says that she is hearing the podcast before.",
                "Nita says that she had heard the podcast before.",
                "Nita says that she has heard the podcast before.",
                "Nita said that she has heard the podcast before."
            ],
            correctAnswer: 2,
            explanation: "With says, tense does not change. I changes to she."
        },
        {
            id: `${quizId}-q44`,
            topic: "Narration",
            difficulty: "medium",
            question: "He said, \"I will go to Indonesia tomorrow.\"",
            options: [
                "He said that he would go to Indonesia tomorrow.",
                "He said that he would go to Indonesia the next day.",
                "He said that he would be going to Indonesia the next day.",
                "He said he would go to Indonesia by tomorrow."
            ],
            correctAnswer: 1,
            explanation: "Will changes to would and tomorrow changes to the next day."
        },
        {
            id: `${quizId}-q45`,
            topic: "Narration",
            difficulty: "medium",
            question: "The teacher asked me if I had seen the match.",
            options: [
                "\"Did you see the match?\" the teacher said to me.",
                "\"Did you had saw the match?\" the teacher said to me.",
                "\"Did you saw the match?\" the teacher said to me.",
                "\"Did you seen the match?\" the teacher said to me."
            ],
            correctAnswer: 0,
            explanation: "Had seen changes back to did you see in direct speech."
        },
        {
            id: `${quizId}-q46`,
            topic: "Narration",
            difficulty: "medium",
            question: "\"Who is it?\" Vikram asked, his euphoria fading.",
            options: [
                "With a fade euphoria Vikram asked who is it.",
                "As his euphoria faded, Vikram asks as to who was it.",
                "With his euphoria faded, Vikram asked who it is.",
                "With his euphoria fading, Vikram asked who it was."
            ],
            correctAnswer: 3,
            explanation: "In indirect speech, question word remains but word order becomes assertive: who it was."
        },
        {
            id: `${quizId}-q47`,
            topic: "Narration",
            difficulty: "medium",
            question: "Rahul asked me, \"Are we going to New York next year?\"",
            options: [
                "Rahul asked that are we going to New York next year.",
                "Rahul asked me that were we going to New York next year.",
                "Rahul asked me that would we go to New York next year?",
                "Rahul asked me if we were going to New York next year."
            ],
            correctAnswer: 3,
            explanation: "Yes/No question changes to asked + object + if/whether. Are going changes to were going."
        },
        {
            id: `${quizId}-q48`,
            topic: "Narration",
            difficulty: "medium",
            question: "Pritam said, \"The prisoner had slept throughout the journey.\"",
            options: [
                "Pritam said that the prisoner had been sleeping throughout the journey.",
                "Pritam said that the prisoner had sleep throughout the journey.",
                "Pritam said that the prisoner had slept throughout the journey.",
                "Pritam said that the prisoner has slept throughout the journey."
            ],
            correctAnswer: 2,
            explanation: "Past perfect generally remains past perfect in indirect speech."
        },
        {
            id: `${quizId}-q49`,
            topic: "Narration",
            difficulty: "medium",
            question: "She said to her maid, \"Clean the utensils properly.\"",
            options: [
                "She ordered her maid to clean the utensils properly.",
                "She commanded her maid that kindly clean the utensils properly.",
                "She orders her maid to clean the utensils properly.",
                "She commands her maid that clean the utensils properly."
            ],
            correctAnswer: 0,
            explanation: "Imperative command changes to ordered + object + to + V1."
        },
        {
            id: `${quizId}-q50`,
            topic: "Narration",
            difficulty: "medium",
            question: "Ravi said, \"I may sell this tie.\"",
            options: [
                "Ravi said that he may sell that tie.",
                "Ravi said that he might sell that tie.",
                "Ravi said that I might sell this tie.",
                "Ravi said that he should sell this tie."
            ],
            correctAnswer: 1,
            explanation: "May changes to might, I changes to he, and this changes to that."
        }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "English",
        title: "Narration Practice Set 1",
        description: "50 SSC CHSL, SSC CGL and SSC CPO narration/direct-indirect speech questions from the provided pages.",
        durationMinutes: 40,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Mixed",
        tags: ["SSC", "CPO", "CGL", "CHSL", "Narration"],
        questions
    });
}());