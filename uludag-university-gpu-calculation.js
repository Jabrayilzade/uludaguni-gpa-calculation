let subjects = []
const pointValues = {
    AA: 4.0, BA: 3.5, BB: 3.0, 
    CB: 2.5, CC: 2.0, DC: 1.5,
    DD: 1.0, FD: 0.5, FF: 0.0
}

subjectElements.each((idx, subjectElement) => {
    const [name, credits, credit, point] = subjectElement.children

    const valName = $(name).text()
    const valCredit = $(credit).text().split(' ')[1].split('.')[0]
    const valPoint = pointValues[$(point).text().split(' ')[0]]

    if (valName === 'YABANCI DİL I (ALMANCA) (YAD111) ') // TODO clean up
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

// TODO implement calculation