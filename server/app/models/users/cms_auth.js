/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('cms_auth', {
		uid: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: 0,
			primaryKey: true
		},
		weigh: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		sector_id: {
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
		tableName: 'cms_auth',
		timestamps: true,
		paranoid: true,
		createAt: 'created_at',
		updateAt: 'updated_at',
		deletedAt: 'deleted_at',
		underscored: true,
		freezeTableName: true
	});
};
