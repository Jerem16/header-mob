import React from "react";
import RadioQuestionForm from "../mapQuestions";

interface DrivingFormProps {
    isAccompanist: boolean | null;
    onAccompanistChange: (value: boolean | null) => void; // ← accepte désormais null
}

const AccompanistData: React.FC<DrivingFormProps> = ({
    isAccompanist,
    onAccompanistChange,
}) => {
    const serviceForm = [
        {
            id: "accompagnateur",
            question: "🚦 Êtes-vous accompagnateur ?",
            name: "accompagnateur",
            options: [
                { id: "accompOk", label: "Oui", value: "oui", condition: true },
                {
                    id: "accompKo",
                    label: "Non",
                    value: "non",
                    condition: false,
                },
            ],
            state: isAccompanist,
            onOptionChange: onAccompanistChange,
        },
    ];

    return (
        <>
            {serviceForm.map((question) => (
                <RadioQuestionForm
                    key={question.id}
                    question={question.question}
                    options={question.options}
                    state={question.state}
                    onOptionChange={question.onOptionChange}
                />
            ))}
        </>
    );
};

export default AccompanistData;
