import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
} from "typeorm";


@Entity({ name: "HouseHoldAndLibrary" })
export class HouseHoldAndLibrary {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: null, type: 'nvarchar', length: "30" })
    RcNumber: string;

    @Column({ default: null, type: 'nvarchar', length: "50" })
    UserId: string;

    @Column({ default: null, type: 'nvarchar', length: "30" })
    MemberId: string;

    @Column({ default: null, type: 'nvarchar', length: "100" })
    ParentAadhar: string;

    @Column({ default: null, type: 'nvarchar', length: "15" })
    ParentMobile: string;

    @Column({ default: null, type: 'nvarchar', length: "15" })
    StudentId: string;

    @Column({ default: null, type: 'nvarchar', length: "30" })
    SurveyMode: string;

    @Column({ default: null, type: 'nvarchar', length: "300" })
    CurrentLocation: string;

    @Column({ default: null, type: 'nvarchar', length: "100" })
    FoodAvailable: string;

    @Column({ default: null, type: 'nvarchar', length: "100" })
    SHGMember: string;

    @Column({ default: null, type: 'nvarchar', length: "100" })
    RoofMaterial: string;

    @Column({ default: null, type: 'nvarchar', length: "100" })
    WallMaterial: string;

    @Column({ default: null, type: 'nvarchar', length: "100" })
    ToiletAvailable: string;

    @Column({ default: null, type: 'nvarchar', length: "100" })
    ToiletWorking: string;

    @Column({ default: null, type: 'nvarchar', length: "100" })
    HouseholdItems: string;

    @Column({ default: null, type: 'nvarchar', length: "100" })
    VillageLibrary: string;

    @Column({ default: null, type: 'nvarchar', length: "100" })
    LibraryGP: string;

    @Column({ default: null, type: 'nvarchar', length: "100" })
    AdultVisited: string;

    @Column({ default: null, type: 'nvarchar', length: "100" })
    VisitCountAdult: string;

    @Column({ default: null, type: 'nvarchar', length: "100" })
    ChildVisited: string;

    @Column({ default: null, type: 'nvarchar', length: "100" })
    VisitCountChild: string;

    @CreateDateColumn()
    createdDate: Date;

    @CreateDateColumn()
    UpdatedDate: Date;
};
