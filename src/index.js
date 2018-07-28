(function() {
  const REPS = [8, 9, 10, 11, 12];
  let record = JSON.parse(localStorage.getItem('all-pro'));
  if (!record) {
    const initialize = (len) => {
      return {
        initialWeight: 0,
        checks: new Array(len).fill(false)
      }
    };
    record = {
      cycle: 1,
      week: 1,
      day: 1,
      unit: 'kg',
      exercise: {
        squats: initialize(4),
        benchPresses: initialize(4),
        bentOverRows: initialize(4),
        overheadBarbellPresses: initialize(2),
        stiffLeggedDeadlifts: initialize(2),
        barbellCurls: initialize(2),
        calfRaises: initialize(2)
      }
    }
  }

  // Save whatever is in the record object to local storage
  const save = () => {
    localStorage.setItem('all-pro', JSON.stringify(record));
  }

  // Remove all the fieldsets
  const clearCheckboxSets = () => {
    let exercises = document.getElementById('exercises');
    while (exercises.firstChild) {
      exercises.removeChild(exercises.firstChild);
    }
  }

  // Create a fieldset of the required sets for a given exercise
  const createCheckboxSet = (exerciseName, exercise) => {
    // First create the fieldset and add the legend
    const fieldSet = document.createElement('fieldset');
    const legend = document.createElement('legend');
    legend.innerHTML = exerciseName;
    fieldSet.appendChild(legend);

    // Second, create the checkboxes for the fieldset
    for (let i = 0; i < exercise.checks.length; i++) {
      const wrapper = document.createElement('div');
      const checkBoxId = `${exerciseName}-checkbox-${i}`;
      const checkBox = document.createElement('input');
      checkBox.setAttribute('id', checkBoxId);
      checkBox.setAttribute('type', 'checkbox');
      checkBox.checked = exercise.checks[i];
      checkBox.addEventListener('click', () => {
        exercise.checks[i] = checkBox.checked;
        save();
      });

      // Figure out the weight
      let weight;
      const reps = REPS[record.week - 1];
      weight = exercise.initialWeight;
      if (record.day === 2) {
        weight *= 0.9;
      } else if (record.day === 3) {
        weight *= 0.8;
      }
      if (exercise.checks.length === 4) {
        if (i === 0) {
          weight = exercise.initialWeight * 0.25;
	} else if (i === 1) {
          weight = exercise.initialWeight * 0.5;
        }
      }

      const label = document.createElement('label');
      label.setAttribute('for', checkBoxId);
      label.innerHTML = `${weight}${record.unit}, ${reps}reps`;

      // Add the checkbox and the label to the wrapping div
      wrapper.appendChild(checkBox);
      wrapper.appendChild(label);

      // Add the wrapper to fieldset
      fieldSet.appendChild(wrapper);
    }

    // Finally, add the fieldset onto the exercises list
    const exercises = document.getElementById('exercises');
    exercises.appendChild(fieldSet);
  }

  // Clear and re-render all the fieldsets
  const render = () => {
    clearCheckboxSets();
    createCheckboxSet('Squats', record.exercise.squats);
    createCheckboxSet('Bench Presses', record.exercise.benchPresses);
    createCheckboxSet('Bent-over Rows', record.exercise.bentOverRows);
    createCheckboxSet('Overhead Barbell Presses', record.exercise.overheadBarbellPresses);
    createCheckboxSet('Stiff-legged Deadlifts', record.exercise.stiffLeggedDeadlifts);
    createCheckboxSet('Barbell Curls', record.exercise.barbellCurls);
    createCheckboxSet('Calf Raises', record.exercise.calfRaises);
  }

  render();
}());

