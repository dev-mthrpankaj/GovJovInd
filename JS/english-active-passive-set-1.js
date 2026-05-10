(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "english-active-passive-set-1";

    const questions = [
        {
            id: `${quizId}-q01`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in passive voice: The committee has approved the revised proposal after several objections.",
            options: [
                "The revised proposal was approved by the committee after several objections.",
                "The revised proposal has been approved by the committee after several objections.",
                "The revised proposal had been approved by the committee after several objections.",
                "The revised proposal is approved by the committee after several objections."
            ],
            correctAnswer: 1,
            explanation: "Present perfect active changes into present perfect passive: has/have + been + V3."
        },
        {
            id: `${quizId}-q02`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in passive voice: The officers were examining the documents when the auditor arrived.",
            options: [
                "The documents were examined by the officers when the auditor arrived.",
                "The documents were being examined by the officers when the auditor arrived.",
                "The documents had been examined by the officers when the auditor arrived.",
                "The documents are being examined by the officers when the auditor arrived."
            ],
            correctAnswer: 1,
            explanation: "Past continuous active changes into past continuous passive: was/were + being + V3."
        },
        {
            id: `${quizId}-q03`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in passive voice: They will announce the final result next week.",
            options: [
                "The final result will be announced by them next week.",
                "The final result will have announced by them next week.",
                "The final result is announced by them next week.",
                "The final result was announced by them next week."
            ],
            correctAnswer: 0,
            explanation: "Future simple active changes into passive: will + be + V3."
        },
        {
            id: `${quizId}-q04`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in active voice: The new policy was criticised by several experts.",
            options: [
                "Several experts criticised the new policy.",
                "Several experts were criticised the new policy.",
                "Several experts have criticised the new policy.",
                "Several experts had criticised the new policy."
            ],
            correctAnswer: 0,
            explanation: "Simple past passive changes into simple past active: subject + V2 + object."
        },
        {
            id: `${quizId}-q05`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in passive voice: Who wrote this confidential report?",
            options: [
                "By whom this confidential report was written?",
                "By whom was this confidential report written?",
                "Who was this confidential report written?",
                "Whom was written this confidential report?"
            ],
            correctAnswer: 1,
            explanation: "In passive voice, 'Who' becomes 'By whom' and the structure is: By whom + was/were + object + V3?"
        },
        {
            id: `${quizId}-q06`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in passive voice: Do not reveal the password to anyone.",
            options: [
                "The password should not reveal to anyone.",
                "Let the password not be revealed to anyone.",
                "Do not let the password revealed to anyone.",
                "The password is not revealed to anyone."
            ],
            correctAnswer: 1,
            explanation: "Negative imperative passive is commonly formed as: Let + object + not + be + V3."
        },
        {
            id: `${quizId}-q07`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in passive voice: Please submit the application before the deadline.",
            options: [
                "You are requested to submit the application before the deadline.",
                "The application is requested to submit before the deadline.",
                "Let the application submitted before the deadline.",
                "The application has requested to be submitted before the deadline."
            ],
            correctAnswer: 0,
            explanation: "A polite imperative may be changed as: You are requested to + V1."
        },
        {
            id: `${quizId}-q08`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in passive voice: The manager gave the clerk clear instructions.",
            options: [
                "Clear instructions were given to the clerk by the manager.",
                "The clerk was gave clear instructions by the manager.",
                "Clear instructions had given to the clerk by the manager.",
                "The manager was given clear instructions by the clerk."
            ],
            correctAnswer: 0,
            explanation: "With double objects, the direct object can become the subject: Clear instructions were given to the clerk."
        },
        {
            id: `${quizId}-q09`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in active voice: The students were taught grammar by Mr. Sharma.",
            options: [
                "Mr. Sharma teaches grammar to the students.",
                "Mr. Sharma taught grammar to the students.",
                "Mr. Sharma was teaching grammar to the students.",
                "Mr. Sharma had taught grammar to the students."
            ],
            correctAnswer: 1,
            explanation: "Past simple passive changes into past simple active."
        },
        {
            id: `${quizId}-q10`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in passive voice: Has the board rejected your appeal?",
            options: [
                "Has your appeal rejected by the board?",
                "Has your appeal been rejected by the board?",
                "Was your appeal rejected by the board?",
                "Had your appeal been rejected by the board?"
            ],
            correctAnswer: 1,
            explanation: "Present perfect interrogative passive: Has/Have + object + been + V3?"
        },
        {
            id: `${quizId}-q11`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in passive voice: Nobody informed me about the change in schedule.",
            options: [
                "I was informed by nobody about the change in schedule.",
                "I was not informed by anybody about the change in schedule.",
                "I had not informed anybody about the change in schedule.",
                "The change in schedule was not informed to me."
            ],
            correctAnswer: 1,
            explanation: "'Nobody informed me' is better changed as 'I was not informed by anybody'."
        },
        {
            id: `${quizId}-q12`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in passive voice: We should respect honest officers.",
            options: [
                "Honest officers should be respected by us.",
                "Honest officers should respected by us.",
                "Honest officers should have respected by us.",
                "Honest officers are should respected by us."
            ],
            correctAnswer: 0,
            explanation: "Modal passive structure: modal + be + V3."
        },
        {
            id: `${quizId}-q13`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in passive voice: The police have arrested the suspect near the railway station.",
            options: [
                "The suspect had been arrested by the police near the railway station.",
                "The suspect has been arrested by the police near the railway station.",
                "The suspect was arrested by the police near the railway station.",
                "The suspect is arrested by the police near the railway station."
            ],
            correctAnswer: 1,
            explanation: "Present perfect active changes into present perfect passive: has been arrested."
        },
        {
            id: `${quizId}-q14`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in active voice: The old bridge is being repaired by the workers.",
            options: [
                "The workers repair the old bridge.",
                "The workers repaired the old bridge.",
                "The workers are repairing the old bridge.",
                "The workers have repaired the old bridge."
            ],
            correctAnswer: 2,
            explanation: "Present continuous passive changes into present continuous active."
        },
        {
            id: `${quizId}-q15`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in passive voice: Did the invigilator check your admit card?",
            options: [
                "Was your admit card checked by the invigilator?",
                "Did your admit card checked by the invigilator?",
                "Had your admit card checked by the invigilator?",
                "Is your admit card checked by the invigilator?"
            ],
            correctAnswer: 0,
            explanation: "Simple past interrogative passive: Was/Were + object + V3?"
        },
        {
            id: `${quizId}-q16`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in passive voice: Someone has stolen my wallet from the bus.",
            options: [
                "My wallet was stolen from the bus.",
                "My wallet has been stolen from the bus.",
                "My wallet had been stolen from the bus.",
                "My wallet is stolen from the bus."
            ],
            correctAnswer: 1,
            explanation: "When the doer is unknown, it may be omitted. Present perfect passive: has been stolen."
        },
        {
            id: `${quizId}-q17`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in passive voice: The principal will have declared the result by evening.",
            options: [
                "The result will be declared by the principal by evening.",
                "The result will have been declared by the principal by evening.",
                "The result would have been declared by the principal by evening.",
                "The result has been declared by the principal by evening."
            ],
            correctAnswer: 1,
            explanation: "Future perfect active changes into passive: will have been + V3."
        },
        {
            id: `${quizId}-q18`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in active voice: The matter should not be discussed in public.",
            options: [
                "One should not discuss the matter in public.",
                "One should not be discussed the matter in public.",
                "The matter should not discuss one in public.",
                "One should not have discussed the matter in public."
            ],
            correctAnswer: 0,
            explanation: "For general passive sentences, 'one' can be used as the active subject."
        },
        {
            id: `${quizId}-q19`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in passive voice: They are going to launch a new portal for applicants.",
            options: [
                "A new portal for applicants is going to be launched by them.",
                "A new portal for applicants was going to be launched by them.",
                "A new portal for applicants has been going to be launched by them.",
                "A new portal for applicants is launched by them."
            ],
            correctAnswer: 0,
            explanation: "'Going to' future passive: is/are going to be + V3."
        },
        {
            id: `${quizId}-q20`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in passive voice: Let the candidates read the instructions carefully.",
            options: [
                "Let the instructions be read carefully by the candidates.",
                "The candidates should read the instructions carefully.",
                "Let the instructions are read carefully by the candidates.",
                "The instructions let be read carefully by the candidates."
            ],
            correctAnswer: 0,
            explanation: "Imperative with 'let' changes as: Let + object + be + V3."
        },
        {
            id: `${quizId}-q21`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in active voice: The match had been abandoned by the referee before sunset.",
            options: [
                "The referee abandoned the match before sunset.",
                "The referee had abandoned the match before sunset.",
                "The referee has abandoned the match before sunset.",
                "The referee was abandoning the match before sunset."
            ],
            correctAnswer: 1,
            explanation: "Past perfect passive changes into past perfect active."
        },
        {
            id: `${quizId}-q22`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in passive voice: The judge ordered the police to produce the accused in court.",
            options: [
                "The police were ordered by the judge to produce the accused in court.",
                "The accused was ordered by the judge to produce the police in court.",
                "The police was ordered by the judge to produce the accused in court.",
                "The accused had ordered the police to be produced in court."
            ],
            correctAnswer: 0,
            explanation: "Object after 'ordered' becomes subject: The police were ordered by the judge..."
        },
        {
            id: `${quizId}-q23`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in passive voice: Why did the authorities cancel the examination?",
            options: [
                "Why was the examination cancelled by the authorities?",
                "Why did the examination cancelled by the authorities?",
                "Why the examination was cancelled by the authorities?",
                "Why had the examination cancelled by the authorities?"
            ],
            correctAnswer: 0,
            explanation: "WH-question passive keeps the WH-word first: Why + was/were + object + V3?"
        },
        {
            id: `${quizId}-q24`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in passive voice: The company may appoint him as regional manager.",
            options: [
                "He may be appointed as regional manager by the company.",
                "He may appointed as regional manager by the company.",
                "He might be appointed as regional manager by the company.",
                "He may have appointed as regional manager by the company."
            ],
            correctAnswer: 0,
            explanation: "Modal 'may' remains 'may'; passive form is may be + V3."
        },
        {
            id: `${quizId}-q25`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in active voice: The truth must be told by you.",
            options: [
                "You must tell the truth.",
                "You must told the truth.",
                "You have to told the truth.",
                "You must be telling the truth."
            ],
            correctAnswer: 0,
            explanation: "Modal passive 'must be told' changes into active 'must tell'."
        },
        {
            id: `${quizId}-q26`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in passive voice: I saw him crossing the road.",
            options: [
                "He was seen crossing the road by me.",
                "He was seen to cross the road by me.",
                "He had been seen crossing the road by me.",
                "The road was seen crossed by him."
            ],
            correctAnswer: 0,
            explanation: "With verbs of perception, 'saw him crossing' becomes 'He was seen crossing'."
        },
        {
            id: `${quizId}-q27`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in passive voice: The teacher made the students rewrite the paragraph.",
            options: [
                "The students were made rewrite the paragraph by the teacher.",
                "The students were made to rewrite the paragraph by the teacher.",
                "The paragraph was made rewritten by the students.",
                "The students had made to rewrite the paragraph by the teacher."
            ],
            correctAnswer: 1,
            explanation: "In passive voice, 'make + object + V1' changes to 'object + be made + to + V1'."
        },
        {
            id: `${quizId}-q28`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in active voice: The files are to be submitted by the candidates today.",
            options: [
                "The candidates are to submit the files today.",
                "The candidates have submitted the files today.",
                "The candidates submitted the files today.",
                "The candidates are submitting the files today."
            ],
            correctAnswer: 0,
            explanation: "'Are to be submitted' changes into 'are to submit'."
        },
        {
            id: `${quizId}-q29`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in passive voice: It is time to close the accounts.",
            options: [
                "It is time for the accounts to be closed.",
                "It is time the accounts are closed.",
                "It is time to be closed the accounts.",
                "It is time that the accounts have closed."
            ],
            correctAnswer: 0,
            explanation: "Infinitive passive structure: to be + V3."
        },
        {
            id: `${quizId}-q30`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in passive voice: People say that he is an honest officer.",
            options: [
                "He is said to be an honest officer.",
                "He was said to be an honest officer.",
                "It is said by people that he was an honest officer.",
                "He is said that he is an honest officer."
            ],
            correctAnswer: 0,
            explanation: "For reporting passive, 'People say that...' becomes 'He is said to be...'"
        },
        {
            id: `${quizId}-q31`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in passive voice: People believe that the minister has resigned.",
            options: [
                "The minister is believed to have resigned.",
                "The minister was believed to resign.",
                "The minister is believed that he has resigned.",
                "It was believed that the minister has resigned."
            ],
            correctAnswer: 0,
            explanation: "For perfect infinitive in reporting passive: is believed to have + V3."
        },
        {
            id: `${quizId}-q32`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in active voice: It is expected that the team will win the final.",
            options: [
                "They expect that the team will win the final.",
                "They expected that the team will win the final.",
                "They are expected that the team will win the final.",
                "They have expected the team will win the final."
            ],
            correctAnswer: 0,
            explanation: "Impersonal passive 'It is expected that...' can be changed to 'They expect that...'"
        },
        {
            id: `${quizId}-q33`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in passive voice: The gardener waters the plants every morning.",
            options: [
                "The plants are watered by the gardener every morning.",
                "The plants were watered by the gardener every morning.",
                "The plants have been watered by the gardener every morning.",
                "The plants are being watered by the gardener every morning."
            ],
            correctAnswer: 0,
            explanation: "Simple present active changes into simple present passive: is/am/are + V3."
        },
        {
            id: `${quizId}-q34`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in passive voice: We must finish the work before the inspection begins.",
            options: [
                "The work must be finished by us before the inspection begins.",
                "The work must have finished by us before the inspection begins.",
                "The work must finished by us before the inspection begins.",
                "The work was finished by us before the inspection begins."
            ],
            correctAnswer: 0,
            explanation: "Modal passive is formed with modal + be + past participle."
        },
        {
            id: `${quizId}-q35`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in active voice: The proposal will be reviewed by the finance department tomorrow.",
            options: [
                "The finance department reviews the proposal tomorrow.",
                "The finance department reviewed the proposal tomorrow.",
                "The finance department will review the proposal tomorrow.",
                "The finance department has reviewed the proposal tomorrow."
            ],
            correctAnswer: 2,
            explanation: "Future simple passive changes into future simple active."
        },
        {
            id: `${quizId}-q36`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in passive voice: The storm damaged several houses in the village.",
            options: [
                "Several houses in the village were damaged by the storm.",
                "Several houses in the village are damaged by the storm.",
                "Several houses in the village had damaged by the storm.",
                "Several houses in the village have damaged by the storm."
            ],
            correctAnswer: 0,
            explanation: "Simple past active changes into simple past passive: was/were + V3."
        },
        {
            id: `${quizId}-q37`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in passive voice: They had completed the bridge before the monsoon arrived.",
            options: [
                "The bridge was completed by them before the monsoon arrived.",
                "The bridge had been completed by them before the monsoon arrived.",
                "The bridge has been completed by them before the monsoon arrived.",
                "The bridge would be completed by them before the monsoon arrived."
            ],
            correctAnswer: 1,
            explanation: "Past perfect active changes into past perfect passive: had been + V3."
        },
        {
            id: `${quizId}-q38`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in active voice: Were the instructions followed by all the candidates?",
            options: [
                "Did all the candidates follow the instructions?",
                "Do all the candidates follow the instructions?",
                "Had all the candidates followed the instructions?",
                "Were all the candidates following the instructions?"
            ],
            correctAnswer: 0,
            explanation: "Simple past passive question changes into simple past active question: Did + subject + V1?"
        },
        {
            id: `${quizId}-q39`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in passive voice: The doctor advised him to avoid oily food.",
            options: [
                "He was advised by the doctor to avoid oily food.",
                "He advised by the doctor to avoid oily food.",
                "Oily food was advised by the doctor to avoid him.",
                "He had advised by the doctor to avoid oily food."
            ],
            correctAnswer: 0,
            explanation: "Object 'him' becomes subject 'He'; advised remains followed by 'to avoid'."
        },
        {
            id: `${quizId}-q40`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in active voice: The thief was caught by the villagers while he was escaping.",
            options: [
                "The villagers caught the thief while he was escaping.",
                "The villagers were catching the thief while he was escaping.",
                "The villagers had caught the thief while he was escaping.",
                "The villagers have caught the thief while he was escaping."
            ],
            correctAnswer: 0,
            explanation: "Simple past passive changes into simple past active."
        },
        {
            id: `${quizId}-q41`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in passive voice: Can you solve this difficult problem without a calculator?",
            options: [
                "Can this difficult problem be solved by you without a calculator?",
                "Could this difficult problem be solved by you without a calculator?",
                "Can this difficult problem solved by you without a calculator?",
                "Can this difficult problem has been solved by you without a calculator?"
            ],
            correctAnswer: 0,
            explanation: "Modal interrogative passive: Can + object + be + V3?"
        },
        {
            id: `${quizId}-q42`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in passive voice: The mechanic is repairing my motorcycle at the workshop.",
            options: [
                "My motorcycle is repaired by the mechanic at the workshop.",
                "My motorcycle was being repaired by the mechanic at the workshop.",
                "My motorcycle is being repaired by the mechanic at the workshop.",
                "My motorcycle has been repaired by the mechanic at the workshop."
            ],
            correctAnswer: 2,
            explanation: "Present continuous active changes into present continuous passive: is being repaired."
        },
        {
            id: `${quizId}-q43`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in passive voice: The staff will be serving lunch at one o'clock.",
            options: [
                "Lunch will serve by the staff at one o'clock.",
                "Lunch will be served by the staff at one o'clock.",
                "Lunch will being served by the staff at one o'clock.",
                "Lunch will have served by the staff at one o'clock."
            ],
            correctAnswer: 1,
            explanation: "Future continuous is usually converted into simple future passive: will be + V3."
        },
        {
            id: `${quizId}-q44`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in active voice: A new syllabus has been introduced by the commission.",
            options: [
                "The commission introduced a new syllabus.",
                "The commission has introduced a new syllabus.",
                "The commission had introduced a new syllabus.",
                "The commission is introducing a new syllabus."
            ],
            correctAnswer: 1,
            explanation: "Present perfect passive changes into present perfect active."
        },
        {
            id: `${quizId}-q45`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in passive voice: The news shocked everyone in the hall.",
            options: [
                "Everyone in the hall was shocked by the news.",
                "Everyone in the hall is shocked by the news.",
                "Everyone in the hall has shocked by the news.",
                "Everyone in the hall had shocked by the news."
            ],
            correctAnswer: 0,
            explanation: "Simple past active changes into simple past passive."
        },
        {
            id: `${quizId}-q46`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in passive voice: She can never forgive such dishonesty.",
            options: [
                "Such dishonesty can never be forgiven by her.",
                "Such dishonesty can never forgiven by her.",
                "Such dishonesty could never be forgiven by her.",
                "Such dishonesty can never have forgiven by her."
            ],
            correctAnswer: 0,
            explanation: "Modal passive: can + never + be + V3."
        },
        {
            id: `${quizId}-q47`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in active voice: The children were not allowed to enter the laboratory.",
            options: [
                "They did not allow the children to enter the laboratory.",
                "They were not allowing the children to enter the laboratory.",
                "They have not allowed the children to enter the laboratory.",
                "They had not allowed the children to enter the laboratory."
            ],
            correctAnswer: 0,
            explanation: "Simple past passive with a hidden subject may be changed using 'They' as the active subject."
        },
        {
            id: `${quizId}-q48`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in passive voice: The investigating team found several errors in the report.",
            options: [
                "Several errors in the report were found by the investigating team.",
                "Several errors in the report are found by the investigating team.",
                "Several errors in the report have been found by the investigating team.",
                "Several errors in the report had found by the investigating team."
            ],
            correctAnswer: 0,
            explanation: "Simple past active changes into passive: were found."
        },
        {
            id: `${quizId}-q49`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in passive voice: The coach encouraged the players to practise regularly.",
            options: [
                "The players were encouraged by the coach to practise regularly.",
                "The players encouraged by the coach to practise regularly.",
                "The players were encouraged to be practised regularly by the coach.",
                "The players had encouraged by the coach to practise regularly."
            ],
            correctAnswer: 0,
            explanation: "Object 'the players' becomes subject and 'to practise' remains unchanged."
        },
        {
            id: `${quizId}-q50`,
            topic: "Active Passive",
            difficulty: "hard",
            question: "Select the option that expresses the given sentence in passive voice: Shut all the windows before leaving the room.",
            options: [
                "All the windows should be shut before leaving the room.",
                "All the windows are shut before leaving the room.",
                "All the windows were shut before leaving the room.",
                "Let all the windows are shut before leaving the room."
            ],
            correctAnswer: 0,
            explanation: "Imperative instruction can be changed into passive using 'should be + V3'."
        }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "English",
        title: "English Active Passive Practice Set 1",
        description: "50 hard-level SSC CGL, CHSL and CPO active-passive voice questions covering tenses, modals, imperatives, questions, double objects and passive-to-active conversion.",
        durationMinutes: 40,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Hard",
        tags: ["SSC", "CPO", "CGL", "CHSL", "Active Passive", "Voice"],
        questions
    });
}());