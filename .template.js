const configTemplate = {
    commitType: [
        {
            name: 'name',
            commitMsg: true,
            ...(commitMsg && { prefix: true }),
            ...(commitMsg && { postfix: true }),
            updateLog: true,
            ...(updateLog && { date: true }),
            ...(updateLog && { verNo: true }),
        }
    ]
}
