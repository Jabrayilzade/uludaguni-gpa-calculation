const subjectElements = $('.DersInfoBar')

const OVERWROTEN_SUBJECTS = ['YABANCI DİL I (ALMANCA) (YAD111) ']
const POINT_VALUES = {
    AA: 4.0, 
    BA: 3.5, 
    BB: 3.0, 
    CB: 2.5, 
    CC: 2.0, 
    DC: 1.5,
    DD: 1.0, 
    FD: 0.5, 
    FF: 0.0
}

const formatName = (elName) => $(name).text()
const formatCredit = (elCredit) => $(credit).text().split(' ')[1].split('.')[0]
const formatPoint = (elPoint) => POINT_VALUES[$(point).text().split(' ')[0]]

const getSubjectArray = () => {
    let subjects = []
    subjectElements.each((idx, subjectElement) => {
        const [name, credits, credit, point] = subjectElement.children
    
        const valName = formatName(name)
        const valCredit = formatCredit(credit)
        const valPoint = formatPoint(point)
    
        if (OVERWROTEN_SUBJECTS.includes(valname))
            return
    
        const newSubject = {
            name: valName,
            credit: valCredit,
            point: valPoint
        }
    
        const existingSubject = subjects.find(el => el.name === valName)
        if (existingSubject) {
            subjects = subjects.map(subject => {
              if (subject.name === valName) 
                return {...subject, point: newSubject.point}
              return subject
            })
        }
        else subjects.push(newSubject)
    })

    return subjects
}

const printSubjects = subjects => {
    subjects.forEach(subject => console.log(`${subject.name} ${subject.credit} ${subject.point}`))
}

const subjects = getSubjectArray()
printSubjects(subjects)