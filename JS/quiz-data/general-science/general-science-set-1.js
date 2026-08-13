(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "general-science-set-1";

    const questions = [
        {
            topic: "Physics",
            difficulty: "Easy",
            question: "Which physical quantity is measured in Newton?",
            options: ["Work", "Force", "Power", "Pressure"],
            correctAnswer: 1,
            explanation: "Newton is the SI unit of force."
        },
        {
            topic: "Physics",
            difficulty: "Easy",
            question: "The SI unit of electric current is ____.",
            options: ["Volt", "Ohm", "Ampere", "Watt"],
            correctAnswer: 2,
            explanation: "Electric current is measured in amperes."
        },
        {
            topic: "Physics",
            difficulty: "Medium",
            question: "Which instrument is used to measure atmospheric pressure?",
            options: ["Thermometer", "Barometer", "Ammeter", "Hygrometer"],
            correctAnswer: 1,
            explanation: "A barometer measures atmospheric pressure."
        },
        {
            topic: "Physics",
            difficulty: "Easy",
            question: "Sound cannot travel through ____.",
            options: ["Air", "Water", "Steel", "Vacuum"],
            correctAnswer: 3,
            explanation: "Sound needs a material medium, so it cannot travel through a vacuum."
        },
        {
            topic: "Physics",
            difficulty: "Medium",
            question: "The speed of light is maximum in ____.",
            options: ["Glass", "Water", "Vacuum", "Diamond"],
            correctAnswer: 2,
            explanation: "Light travels fastest in vacuum."
        },
        {
            topic: "Physics",
            difficulty: "Easy",
            question: "Which mirror is used as a rear-view mirror in vehicles?",
            options: ["Plane mirror", "Concave mirror", "Convex mirror", "Cylindrical mirror"],
            correctAnswer: 2,
            explanation: "Convex mirrors give a wider field of view, so they are used as rear-view mirrors."
        },
        {
            topic: "Physics",
            difficulty: "Medium",
            question: "The resistance of a conductor generally increases when its ____ increases.",
            options: ["Length", "Area", "Brightness", "Magnetism"],
            correctAnswer: 0,
            explanation: "For a uniform conductor, resistance is directly proportional to length."
        },
        {
            topic: "Physics",
            difficulty: "Easy",
            question: "Which device converts electrical energy into mechanical energy?",
            options: ["Generator", "Electric motor", "Transformer", "Microphone"],
            correctAnswer: 1,
            explanation: "An electric motor converts electrical energy into mechanical energy."
        },
        {
            topic: "Physics",
            difficulty: "Medium",
            question: "The property by which a body opposes change in its state of rest or motion is called ____.",
            options: ["Momentum", "Inertia", "Friction", "Impulse"],
            correctAnswer: 1,
            explanation: "Inertia is the tendency of a body to resist change in its state of motion or rest."
        },
        {
            topic: "Physics",
            difficulty: "Easy",
            question: "Which colour of visible light has the shortest wavelength?",
            options: ["Red", "Yellow", "Green", "Violet"],
            correctAnswer: 3,
            explanation: "Violet light has the shortest wavelength in the visible spectrum."
        },
        {
            topic: "Chemistry",
            difficulty: "Easy",
            question: "The chemical symbol of sodium is ____.",
            options: ["So", "Na", "Sd", "Sn"],
            correctAnswer: 1,
            explanation: "Sodium's chemical symbol is Na."
        },
        {
            topic: "Chemistry",
            difficulty: "Easy",
            question: "The pH value of a neutral solution at room temperature is ____.",
            options: ["0", "4", "7", "14"],
            correctAnswer: 2,
            explanation: "A neutral solution has pH 7 at room temperature."
        },
        {
            topic: "Chemistry",
            difficulty: "Medium",
            question: "Which gas is released when acids react with most metals?",
            options: ["Oxygen", "Nitrogen", "Hydrogen", "Carbon dioxide"],
            correctAnswer: 2,
            explanation: "Acids usually react with metals to release hydrogen gas."
        },
        {
            topic: "Chemistry",
            difficulty: "Easy",
            question: "Rusting of iron is an example of ____.",
            options: ["Reduction", "Oxidation", "Sublimation", "Neutralization"],
            correctAnswer: 1,
            explanation: "Rusting involves oxidation of iron in the presence of air and moisture."
        },
        {
            topic: "Chemistry",
            difficulty: "Medium",
            question: "Which of the following is a noble gas?",
            options: ["Chlorine", "Helium", "Hydrogen", "Oxygen"],
            correctAnswer: 1,
            explanation: "Helium is a noble gas."
        },
        {
            topic: "Chemistry",
            difficulty: "Easy",
            question: "Baking soda is chemically known as ____.",
            options: ["Sodium carbonate", "Sodium bicarbonate", "Calcium carbonate", "Sodium chloride"],
            correctAnswer: 1,
            explanation: "Baking soda is sodium bicarbonate."
        },
        {
            topic: "Chemistry",
            difficulty: "Medium",
            question: "Which acid is present in vinegar?",
            options: ["Acetic acid", "Citric acid", "Lactic acid", "Sulphuric acid"],
            correctAnswer: 0,
            explanation: "Vinegar contains acetic acid."
        },
        {
            topic: "Chemistry",
            difficulty: "Easy",
            question: "The most abundant gas in Earth's atmosphere is ____.",
            options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
            correctAnswer: 1,
            explanation: "Nitrogen makes up about 78 percent of Earth's atmosphere."
        },
        {
            topic: "Chemistry",
            difficulty: "Medium",
            question: "Which metal is liquid at room temperature?",
            options: ["Iron", "Mercury", "Copper", "Aluminium"],
            correctAnswer: 1,
            explanation: "Mercury is a metal that remains liquid at room temperature."
        },
        {
            topic: "Chemistry",
            difficulty: "Easy",
            question: "Common salt is chemically called ____.",
            options: ["Sodium chloride", "Potassium nitrate", "Calcium oxide", "Magnesium sulphate"],
            correctAnswer: 0,
            explanation: "Common salt is sodium chloride."
        },
        {
            topic: "Biology",
            difficulty: "Easy",
            question: "The basic structural and functional unit of life is ____.",
            options: ["Tissue", "Organ", "Cell", "Nucleus"],
            correctAnswer: 2,
            explanation: "The cell is the basic unit of life."
        },
        {
            topic: "Biology",
            difficulty: "Easy",
            question: "Which part of the plant performs photosynthesis mainly?",
            options: ["Root", "Leaf", "Flower", "Stem"],
            correctAnswer: 1,
            explanation: "Leaves contain chlorophyll and mainly perform photosynthesis."
        },
        {
            topic: "Biology",
            difficulty: "Medium",
            question: "Which pigment gives green colour to leaves?",
            options: ["Haemoglobin", "Chlorophyll", "Melanin", "Carotene"],
            correctAnswer: 1,
            explanation: "Chlorophyll is the green pigment in leaves."
        },
        {
            topic: "Biology",
            difficulty: "Easy",
            question: "The largest organ of the human body is ____.",
            options: ["Liver", "Skin", "Heart", "Lung"],
            correctAnswer: 1,
            explanation: "Skin is the largest organ of the human body."
        },
        {
            topic: "Biology",
            difficulty: "Medium",
            question: "Which blood cells help in clotting of blood?",
            options: ["Red blood cells", "White blood cells", "Platelets", "Plasma"],
            correctAnswer: 2,
            explanation: "Platelets help in blood clotting."
        },
        {
            topic: "Biology",
            difficulty: "Easy",
            question: "Which organ pumps blood in the human body?",
            options: ["Lungs", "Heart", "Kidney", "Liver"],
            correctAnswer: 1,
            explanation: "The heart pumps blood throughout the body."
        },
        {
            topic: "Biology",
            difficulty: "Medium",
            question: "Deficiency of vitamin C causes ____.",
            options: ["Rickets", "Scurvy", "Night blindness", "Anaemia"],
            correctAnswer: 1,
            explanation: "Vitamin C deficiency causes scurvy."
        },
        {
            topic: "Biology",
            difficulty: "Medium",
            question: "The functional unit of the kidney is ____.",
            options: ["Neuron", "Nephron", "Alveolus", "Villus"],
            correctAnswer: 1,
            explanation: "Nephron is the functional unit of the kidney."
        },
        {
            topic: "Biology",
            difficulty: "Easy",
            question: "Which blood group is known as the universal donor in the ABO system?",
            options: ["A", "B", "AB", "O"],
            correctAnswer: 3,
            explanation: "In the ABO system, group O is commonly called the universal donor."
        },
        {
            topic: "Biology",
            difficulty: "Medium",
            question: "Which part of the human brain controls balance and posture?",
            options: ["Cerebrum", "Cerebellum", "Medulla", "Hypothalamus"],
            correctAnswer: 1,
            explanation: "The cerebellum helps control balance and posture."
        },
        {
            topic: "Human Health",
            difficulty: "Easy",
            question: "Malaria is caused by ____.",
            options: ["Virus", "Bacteria", "Protozoa", "Fungus"],
            correctAnswer: 2,
            explanation: "Malaria is caused by Plasmodium, a protozoan parasite."
        },
        {
            topic: "Human Health",
            difficulty: "Medium",
            question: "Which mosquito spreads dengue?",
            options: ["Aedes", "Anopheles", "Culex", "Housefly"],
            correctAnswer: 0,
            explanation: "Dengue is mainly spread by Aedes mosquitoes."
        },
        {
            topic: "Human Health",
            difficulty: "Easy",
            question: "Which vitamin is produced in the skin in sunlight?",
            options: ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D"],
            correctAnswer: 3,
            explanation: "Sunlight helps the skin produce vitamin D."
        },
        {
            topic: "Human Health",
            difficulty: "Medium",
            question: "Iodine deficiency mainly affects which gland?",
            options: ["Thyroid", "Adrenal", "Pituitary", "Pancreas"],
            correctAnswer: 0,
            explanation: "Iodine is needed for thyroid hormone production."
        },
        {
            topic: "Human Health",
            difficulty: "Easy",
            question: "Which mineral is essential for haemoglobin formation?",
            options: ["Calcium", "Iron", "Sodium", "Potassium"],
            correctAnswer: 1,
            explanation: "Iron is essential for haemoglobin formation."
        },
        {
            topic: "Environment",
            difficulty: "Easy",
            question: "The process by which green plants make food is called ____.",
            options: ["Respiration", "Photosynthesis", "Transpiration", "Digestion"],
            correctAnswer: 1,
            explanation: "Photosynthesis is the process by which green plants make food."
        },
        {
            topic: "Environment",
            difficulty: "Medium",
            question: "Which gas is mainly responsible for global warming?",
            options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Helium"],
            correctAnswer: 2,
            explanation: "Carbon dioxide is a major greenhouse gas linked with global warming."
        },
        {
            topic: "Environment",
            difficulty: "Easy",
            question: "The ozone layer protects Earth from harmful ____ radiation.",
            options: ["Infrared", "Ultraviolet", "Microwave", "Radio wave"],
            correctAnswer: 1,
            explanation: "The ozone layer absorbs much of the Sun's harmful ultraviolet radiation."
        },
        {
            topic: "Environment",
            difficulty: "Medium",
            question: "Biodegradable waste is waste that can be decomposed by ____.",
            options: ["Microorganisms", "Metals", "Plasticizers", "Glass"],
            correctAnswer: 0,
            explanation: "Microorganisms decompose biodegradable waste."
        },
        {
            topic: "Environment",
            difficulty: "Easy",
            question: "Which of the following is a renewable source of energy?",
            options: ["Coal", "Petroleum", "Natural gas", "Solar energy"],
            correctAnswer: 3,
            explanation: "Solar energy is a renewable source of energy."
        },
        {
            topic: "Everyday Science",
            difficulty: "Easy",
            question: "A fuse wire is used in an electric circuit to protect against ____.",
            options: ["Overloading", "Cooling", "Reflection", "Evaporation"],
            correctAnswer: 0,
            explanation: "A fuse melts during excess current and protects the circuit from overloading."
        },
        {
            topic: "Everyday Science",
            difficulty: "Medium",
            question: "Pressure cooker cooks food faster because it ____.",
            options: ["Lowers boiling point", "Raises boiling point", "Removes water", "Freezes steam"],
            correctAnswer: 1,
            explanation: "A pressure cooker raises the boiling point of water, so food cooks faster."
        },
        {
            topic: "Everyday Science",
            difficulty: "Easy",
            question: "The white light from the Sun is composed of ____ colours.",
            options: ["Three", "Five", "Seven", "Ten"],
            correctAnswer: 2,
            explanation: "White light splits into seven visible colours."
        },
        {
            topic: "Everyday Science",
            difficulty: "Medium",
            question: "Which gas is used by plants during photosynthesis?",
            options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
            correctAnswer: 1,
            explanation: "Plants use carbon dioxide during photosynthesis."
        },
        {
            topic: "Everyday Science",
            difficulty: "Easy",
            question: "The process of changing water vapour into liquid water is called ____.",
            options: ["Evaporation", "Condensation", "Sublimation", "Melting"],
            correctAnswer: 1,
            explanation: "Condensation is the change of water vapour into liquid water."
        },
        {
            topic: "Space Science",
            difficulty: "Easy",
            question: "The nearest star to Earth is ____.",
            options: ["Sirius", "Sun", "Polaris", "Proxima Centauri"],
            correctAnswer: 1,
            explanation: "The Sun is the nearest star to Earth."
        },
        {
            topic: "Space Science",
            difficulty: "Medium",
            question: "The force that keeps planets in orbit around the Sun is ____.",
            options: ["Friction", "Magnetism", "Gravity", "Elasticity"],
            correctAnswer: 2,
            explanation: "Gravity keeps planets in orbit around the Sun."
        },
        {
            topic: "Space Science",
            difficulty: "Easy",
            question: "Which planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Jupiter", "Saturn"],
            correctAnswer: 1,
            explanation: "Mars is known as the Red Planet."
        },
        {
            topic: "Space Science",
            difficulty: "Medium",
            question: "A lunar eclipse occurs when ____.",
            options: ["Moon comes between Sun and Earth", "Earth comes between Sun and Moon", "Sun comes between Earth and Moon", "Moon disappears permanently"],
            correctAnswer: 1,
            explanation: "A lunar eclipse occurs when Earth comes between the Sun and the Moon."
        },
        {
            topic: "Science and Technology",
            difficulty: "Easy",
            question: "Which device is used to convert solar energy into electrical energy?",
            options: ["Solar cell", "Transformer", "Microphone", "Barometer"],
            correctAnswer: 0,
            explanation: "A solar cell converts solar energy into electrical energy."
        }
    ].map((question, index) => ({
        id: `${quizId}-q${String(index + 1).padStart(2, "0")}`,
        subject: "General Science",
        marks: 1,
        negativeMarks: 0.25,
        ...question
    }));

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "General Science",
        title: "General Science Practice Set 1",
        description: "Physics, chemistry, biology, environment and everyday science questions for government exam practice.",
        durationMinutes: 30,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Mixed",
        tags: ["SSC", "Railway", "Police", "State Exams", "General Science"],
        questions
    });
}());
