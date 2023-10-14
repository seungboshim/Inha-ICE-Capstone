export type Ballot = {
    ballotId: number,
    ballotName: string,
    ballotStartDateTime: string,
    ballotEndDateTime: string,
    ballotMinAge: number,
    ballotMaxAge: number,
    ballotSubjectRegion: string,
    ballotSubjectGender: string,
    ballotBriefDescription: string,
    ballotImage: string,
    ballotStatus: string,
}

export type Candidate = {
    candidateId: number,
    candidateName: string,
    candidateVoteCount: number,
    candidateImage: string,
}