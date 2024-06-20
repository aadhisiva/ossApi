import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    JoinColumn,
    ManyToOne
} from "typeorm";
import { RoleHierarchy } from "./rolesHierarchy";


@Entity({ name: "AssigningMasters" })
export class AssigningMasters {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => RoleHierarchy, rh=> rh.id)
    @JoinColumn({name: "RoleId"})
    RoleId: string;

    @Column({ default: null, type: 'nvarchar', length: "30" })
    Name: string;

    @Column({ default: null, type: 'nvarchar', length: "30" })
    Otp: string;

    @Column({ default: null, type: 'nvarchar', length: "12" })
    Mobile: string;

    @Column({ default: null, type: 'nvarchar', length: "40" })
    DistrictCode: string;

    @Column({ default: null, type: 'nvarchar', length: "40" })
    TalukCode: string;

    @Column({ default: null, type: 'nvarchar', length: "40" })
    GpCode: string;

    @Column({ default: null, type: 'nvarchar', length: "40" })
    VillageCode: string;

    @Column({ default: null, type: 'nvarchar', length: "40" })
    CreatedMobile: string;

    @Column({ default: null, type: 'nvarchar', length: "50" })
    CreatedRole: string;

    @Column({ default: null, type: 'nvarchar', length: "100" })
    RuralOrUrban: string;

    @Column({ default: null, type: 'nvarchar', length: "100" })
    ListType: string;

    @CreateDateColumn()
    createdDate: Date;

    @CreateDateColumn()
    UpdatedDate: Date;
};
