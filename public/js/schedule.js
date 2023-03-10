function displaySchedule() {
    var days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var slots = [
      "9:00 AM - 10:00 AM",
      "10:00 AM - 11:00 AM",
      "11:00 AM - 12:00 PM",
      "12:00 PM - 1:00 PM",
      "1:00 PM - 2:00 PM",
      "2:00 PM - 3:00 PM",
      "3:00 PM - 4:00 PM",
      "4:00 PM - 5:00 PM",
    ];

    var table = document.createElement("table");
    var thead = document.createElement("thead");
    var tbody = document.createElement("tbody");

    // Create table header
    var headerRow = document.createElement("tr");
    var dayHeader = document.createElement("th");
    dayHeader.appendChild(document.createTextNode("Day"));
    headerRow.appendChild(dayHeader);

    for (var i = 0; i < slots.length; i++) {
      var slotHeader = document.createElement("th");
      slotHeader.appendChild(document.createTextNode(slots[i]));
      headerRow.appendChild(slotHeader);
    }

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    for (var i = 0; i < days.length; i++) {
      var row = document.createElement("tr");
      var dayCell = document.createElement("td");
      dayCell.appendChild(document.createTextNode(days[i]));
      row.appendChild(dayCell);

      for (var j = 0; j < slots.length; j++) {
        var cell = document.createElement("td");
        cell.setAttribute("id", days[i] + slots[j]);
        var button = document.createElement("button");
        button.setAttribute("type", "button");
        button.setAttribute("class", "btn btn-sm btn-outline-primary");
        button.setAttribute("data-toggle", "modal");
        button.setAttribute(
          "data-target",
          "#" + days[i] + slots[j] + "Modal"
        );
        button.innerHTML = '<i class="fa fa-plus"></i>';
        cell.appendChild(button);

        var modal = document.createElement("div");
        modal.setAttribute("class", "modal fade");
        modal.setAttribute("id", days[i] + slots[j] + "Modal");
        modal.setAttribute("tabindex", "-1");
        modal.setAttribute("role", "dialog");
        modal.setAttribute(
          "aria-labelledby",
          days[i] + slots[j] + "ModalLabel"
        );
        modal.setAttribute("aria-hidden", "true");

        var modalDialog = document.createElement("div");
        modalDialog.setAttribute("class", "modal-dialog");
        modalDialog.setAttribute("role", "document");

        var modalContent = document.createElement("div");
        modalContent.setAttribute("class", "modal-content");

        var modalHeader = document.createElement("div");
        modalHeader.setAttribute("class", "modal-header");

        var modalTitle = document.createElement("h5");
        modalTitle.setAttribute("class", "modal-title");
        modalTitle.setAttribute("id", days[i] + slots[j] + "ModalLabel");
        modalTitle.appendChild(document.createTextNode("Add Task"));
        var closeButton = document.createElement("button");
        closeButton.setAttribute("type", "button");
        closeButton.setAttribute("class", "close");
        closeButton.setAttribute("data-dismiss", "modal");
        closeButton.setAttribute("aria-label", "Close");

        var closeIcon = document.createElement("span");
        closeIcon.setAttribute("aria-hidden", "true");
        closeIcon.innerHTML = "&times;";

        closeButton.appendChild(closeIcon);
        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeButton);
        modalContent.appendChild(modalHeader);

        var modalBody = document.createElement("div");
        modalBody.setAttribute("class", "modal-body");

        var form = document.createElement("form");
        form.setAttribute("id", days[i] + slots[j] + "Form");

        var formGroup = document.createElement("div");
        formGroup.setAttribute("class", "form-group");

        var label = document.createElement("label");
        label.setAttribute("for", days[i] + slots[j] + "Input");
        label.appendChild(document.createTextNode("Task"));

        var input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("class", "form-control");
        input.setAttribute("id", days[i] + slots[j] + "Input");

        formGroup.appendChild(label);
        formGroup.appendChild(input);
        form.appendChild(formGroup);
        modalBody.appendChild(form);
        modalContent.appendChild(modalBody);

        var modalFooter = document.createElement("div");
        modalFooter.setAttribute("class", "modal-footer");

        var saveButton = document.createElement("button");
        saveButton.setAttribute("type", "button");
        saveButton.setAttribute("class", "btn btn-primary");
        saveButton.setAttribute(
          "onclick",
          'addTask("' + days[i] + slots[j] + '")'
        );
        saveButton.appendChild(document.createTextNode("Save"));

        modalFooter.appendChild(saveButton);
        modalContent.appendChild(modalFooter);
        modalDialog.appendChild(modalContent);
        modal.appendChild(modalDialog);
        cell.appendChild(modal);
        row.appendChild(cell);
      }
      tbody.appendChild(row);
    }

    table.appendChild(tbody);

    document.getElementById("schedule").appendChild(table);
  }

  function addTask(id) {
    var input = document.getElementById(id + "Input").value;
    var cell = document.getElementById(id);
    var task = document.createElement("div");
    task.setAttribute("class", "rounded p-2 my-2");
    task.style.backgroundColor = "#ffc107";
    task.style.borderRadius = "30px";
    task.appendChild(document.createTextNode(input));
    task.style.transition = "transform 0.2s ease-in-out";

    task.addEventListener("mouseenter", function () {
      task.style.transform = "scale(1.1)";
    });

    task.addEventListener("mouseleave", function () {
      task.style.transform = "scale(1)";
    });
    cell.appendChild(task);
    $("#" + id + "Modal").modal("hide");
  }