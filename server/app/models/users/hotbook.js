/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('hotbook', {
		id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		index: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		image: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		author: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		title: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: false
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: false
		},
	}, {
		sequelize,
		tableName: 'hotbook',
		timestamps: true,
		paranoid: true,
		createAt: 'created_at',
		updateAt: 'updated_at',
		deletedAt: 'deleted_at',
		underscored: true,
		freezeTableName: true
	});
};
