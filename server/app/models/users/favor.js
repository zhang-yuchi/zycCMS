/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('favor', {
		id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		uid: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		art_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		type: {
			type: DataTypes.INTEGER(11),
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
		tableName: 'favor',
		timestamps: true,
		paranoid: true,
		createAt: 'created_at',
		updateAt: 'updated_at',
		deletedAt: 'deleted_at',
		underscored: true,
		freezeTableName: true
	});
};
