
  const progress = document.querySelector('.progress');
  const steps = 3; // Total number of steps/pages
  let currentStep = 1; // Change this dynamically based on the current step/page

  function updateProgress(step) {
    currentStep = step;
    const progressPercentage = (currentStep / steps) * 100;
    progress.style.width = `${progressPercentage}%`;
  }

  // Call this function when the page loads or step changes
  // For example, on step 1: updateProgress(1);
  updateProgress(1); // Update based on the step number

