/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('hot_book', {
		created_at: {
			type: DataTypes.DATE,
			allowNull: true
		},
		status: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
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
			type: DataTypes.STRING(64),
			allowNull: true
		},
		author: {
			type: DataTypes.STRING(25),
			allowNull: true
		},
		title: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: true
		},
	}, {
		sequelize,
		tableName: 'hot_book',
		timestamps: true,
		paranoid: true,
		createAt: 'created_at',
		updateAt: 'updated_at',
		deletedAt: 'deleted_at',
		underscored: true,
		freezeTableName: true
	});
};
