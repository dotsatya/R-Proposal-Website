"use client";

import { useState, useCallback } from "react";

export type ProposalStep =
  | "welcome"
  | "trust"
  | "love"
  | "proposal"
  | "gallery"
  | "message"
  | "letter"
  | "celebration";

export function useProposal() {
  const [currentStep, setCurrentStep] = useState<ProposalStep>("welcome");

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => {
      switch (prev) {
        case "welcome":
          return "trust";
        case "trust":
          return "love";
        case "love":
          return "proposal";
        case "proposal":
          return "gallery";
        case "gallery":
          return "message";
        case "message":
          return "letter";
        case "letter":
          return "celebration";
        default:
          return prev;
      }
    });
  }, []);

  const goToStep = useCallback((step: ProposalStep) => {
    setCurrentStep(step);
  }, []);

  const acceptProposal = useCallback(() => {
    setCurrentStep("gallery");
  }, []);

  const resetProposal = useCallback(() => {
    setCurrentStep("welcome");
  }, []);

  return {
    currentStep,
    goToStep,
    nextStep,
    acceptProposal,
    resetProposal,
  };
}
