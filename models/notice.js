const { INTEGER } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = class Notice extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            title:{
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            hits:{
                type: INTEGER,
                allowNull: false,
            },
            writer:{
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            content:{
                type: Sequelize.TEXT,
                allowNull: true,
            },
        },{
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Notice',
            tableName: 'notices',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db){
        db.Notice.belongsTo(db.User, { foreignKey: 'writer', sourceKey: 'id' });
    }
};