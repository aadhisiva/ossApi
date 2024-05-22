import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
} from "typeorm";


@Entity({ name: "AssignedData" })
export class AssignedData {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: null, type: 'nvarchar', length: "30" })
    Role: string;

    @Column({ default: null, type: 'nvarchar', length: "30" })
    Name: string;

    @Column({ default: null, type: 'nvarchar', length: "30" })
    TalukOfficerName: string;

    @Column({ default: null, type: 'nvarchar', length: "30" })
    Otp: string;

    @Column({ default: null, type: 'nvarchar', length: "12" })
    Mobile: string;

    @Column({ default: null, type: 'nvarchar', length: "12" })
    TalukOfficerMobile: string;

    @Column({ default: null, type: 'nvarchar', length: "12" })
    GpOfficerMobile: string;

    @Column({ default: null, type: 'nvarchar', length: "30" })
    GpOfficerName: string;

    @Column({ default: null, type: 'nvarchar', length: "40" })
    DistrictCode: string;

    @Column({ default: null, type: 'nvarchar', length: "40" })
    TalukCode: string;

    @Column({ default: null, type: 'nvarchar', length: "40" })
    PhcCode: string;

    @Column({ default: null, type: 'nvarchar', length: "40" })
    GpOrWard: string;

    @Column({ default: null, type: 'nvarchar', length: "40" })
    CreatedMobile: string;

    @Column({ default: null, type: 'nvarchar', length: "50" })
    CreatedRole: string;

    @Column({ default: null, type: 'nvarchar', length: "40" })
    AssigningType: string;

    @Column({ default: null, type: 'nvarchar', length: "100" })
    MasterType: string;

    @Column({ default: null, type: 'nvarchar', length: "100" })
    ListType: string;

    @CreateDateColumn()
    createdDate: Date;

    @CreateDateColumn()
    UpdatedDate: Date;
};
