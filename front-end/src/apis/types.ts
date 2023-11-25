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

export type GenderVote = {
    MALE: number,
    FEMALE: number,
}

export type RegionVote = {
    SEOUL: number,
    INCHEON: number,
    GYEONGGI: number,
    GANGWON: number,
    CHUNGCHEONGBUK: number,
    CHUNGCHEONGNAM: number,
    JEOLLABUK: number,
    JEOLLANAM: number,
    GYEONGSANGBUK: number,
    GYEONGSANGNAM: number,
}

export type AgeGroupVote = {
    TEENS_OR_LESS: GenderVote,
    TWENTIES: GenderVote,
    THIRTIES: GenderVote,
    FORTIES: GenderVote,
    FIFTIES: GenderVote,
    SIXTIES_OR_ABOVE: GenderVote
}

export type Candidate = {
    candidateId: number,
    candidateName: string,
    candidateVoteCount: number,
    candidateImage: string,
    genderPercentage?: GenderVote,
    genderVoteCount?: GenderVote,
    regionPercentage?: RegionVote,
    regionVoteCount?: RegionVote,
    ageGroupPercentage?: AgeGroupVote,
    ageGroupVoteCount?: AgeGroupVote,

}