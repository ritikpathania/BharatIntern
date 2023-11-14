document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function fetchIssues () {
    const issues = JSON.parse(localStorage.getItem('issues'));
    const issuesList = document.getElementById('issuesList');

    issuesList.innerHTML = '';

    for (let i = 0; i < issues.length; i++) {
        const id = issues[i].id;
        const desc = issues[i].description;
        const severity = issues[i].severity;
        const assignedTo = issues[i].assignedTo;
        const status = issues[i].status;

        issuesList.innerHTML += '<div class="well">'+
            '<div class="labid"> <p><span class="label label-info">' + status + '</span></p>'+
            '<h6>Task ID: ' + id + '</h6> </div>'+
            '<h3>' + desc + '</h3>'+
            '<p><span class="glyphicon glyphicon-folder-open"></span> ' + severity + ' '+
            '<span class="glyphicon glyphicon-user"></span> ' + assignedTo +'</p>'+
            '<a href="#"  id="closebtn" class="btn btn-success"  onclick="setStatusClosed(\''+id+'\')"><i class="far fa-check-circle"></i>&nbsp;Mark as Completed</a> '+
            '<a href="#" id="delbtn" class="btn btn-danger" onclick="deleteIssue(\''+id+'\')"><i class="glyphicon glyphicon-trash"></i> Delete</a>'+
            '</div>';
    }
}

function saveIssue(e) {
    let issues;
    const issueId = chance.guid();
    const issueDesc = document.getElementById('issueDescInput').value;
    const issueSeverity = document.getElementById('issueSeverityInput').value;
    const issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    const issueStatus = 'Pending';
    const issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    };

    if (localStorage.getItem('issues') === null) {
        issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    } else {
        issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    document.getElementById('issueInputForm').reset();
    fetchIssues();
    e.preventDefault();
}

// close status
function setStatusClosed (id) {
    const issues = JSON.parse(localStorage.getItem('issues'));

    for(let i = 0; i < issues.length; i++) {
        if (issues[i].id === id) {
            issues[i].status = " Task Completed";
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}

// delete issue
function deleteIssue (id) {
    const issues = JSON.parse(localStorage.getItem('issues'));

    for(let i = 0; i < issues.length; i++) {
        if (issues[i].id === id) {
            issues.splice(i, 1);
        }
    }
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}