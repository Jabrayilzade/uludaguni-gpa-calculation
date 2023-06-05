const GRADE_VALUE_MAP = {
    "AA": 4,
    "BA": 3.5,
    "BB": 3,
    "CB": 2.5,
    "CC": 2,
    "DC": 1.5,
    "DD": 1,
    "FD": 0.5,
    "FF": 0,
}

const rows = document.querySelectorAll('#DersGecmis tr.line1, tr.line2');
let subjects = Array.from(rows).map((row) => {
    const [, code, name, , , , , credits, grade, , description] = row.querySelector('table tr').children;

    return {
        code: code.innerText,
        name: name.innerText,
        credits: +credits.innerText,
        grade: grade.innerText,
        gradeValue: GRADE_VALUE_MAP[grade.innerText] * +credits.innerText,
        description: description.innerText,
    }
})

// Hardcoded pending subject
subjects.push({
    code: "BMB4020",
    name: "GENOMİK HESAPLAMA",
    credits: 5,
    grade: "AA",
    gradeValue: 0,
    description: "Mükemmel",
})

let subjectsMap = new Map();
subjects.forEach((subject) => subjectsMap.set(subject.code, subject));

// const filteredSubjects = subjects.filter((s) => s.grade !== "FF" && s.grade !== "G");
const filteredSubjects = Array.from(subjectsMap.values()).filter((s) => s.grade !== "FF" && s.grade !== "G");

const creditsSum = filteredSubjects.map((subject) => subject.credits).reduce((acc, value) => acc + value, 0)
const gradeValuesSum = filteredSubjects.map((subject) => subject.gradeValue).reduce((acc, value) => acc + value, 0)

const GPA = gradeValuesSum / creditsSum;
console.log({
    GPA,
    creditsSum,
    gradeValuesSum,
});

filteredSubjects.push({
    code: "GPA",
    name: GPA,
    credits: "",
    grade: "",
    gradeValue: "",
    description: "",
})

const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
  JSON.stringify(filteredSubjects)
)}`;

const link = document.createElement("a");
link.href = jsonString;
link.download = "filtered-grades.json";

link.click();
