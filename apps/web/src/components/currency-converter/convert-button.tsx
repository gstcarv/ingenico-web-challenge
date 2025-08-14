import { Button } from "@ingenico-challenge/ui";
import { useState } from "react";

interface ConvertButtonProps {
    isSubmitting: boolean;
    hasError: boolean;
    onRetry: () => void;
    onSubmit: (e: React.FormEvent) => void;
}

export const ConvertButton = ({ isSubmitting, hasError, onRetry, onSubmit }: ConvertButtonProps) => {
    const [isRetrying, setIsRetrying] = useState(false);

    const handleRetry = async () => {
        setIsRetrying(true);
        try {
            await onRetry();
        } finally {
            setIsRetrying(false);
        }
    };

    if (hasError && !isRetrying) {
        return (
            <Button
                variant="destructive"
                className="w-full font-medium py-3 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-error-500 focus:ring-offset-2"
                type="button"
                onClick={handleRetry}
                disabled={isRetrying}
            >
                An error occurred, try again
            </Button>
        );
    }

    return (
        <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            type="submit"
            disabled={isSubmitting}
            onClick={onSubmit}
        >
            {isSubmitting ? "Converting..." : "Convert"}
        </Button>
    );
};
