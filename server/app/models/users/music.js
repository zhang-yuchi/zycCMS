/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('music', {
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
		image: {
			type: DataTypes.STRING(64),
			allowNull: true
		},
		content: {
			type: DataTypes.STRING(300),
			allowNull: true
		},
		url: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		pubdate: {
			type: DataTypes.DATEONLY,
			allowNull: true
		},
		fav_nums: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		type: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		title: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'music',
		timestamps: true,
		paranoid: true,
		createAt: 'created_at',
		updateAt: 'updated_at',
		deletedAt: 'deleted_at',
		underscored: true,
		freezeTableName: true
	});
};
