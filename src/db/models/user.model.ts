import { AllowNull, Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName: 'tasks' // Change 'user' to 'tasks'
})
export class Task extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    title!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    description!: string;

    @Column({
        type: DataType.BOOLEAN, // Change this to BOOLEAN for completed status
        allowNull: false,
        defaultValue: false // Default value to false
    })
    completed!: boolean; // Change status to completed
}
