##
##
## Create Database
##
##

# Create Cluster
resource "aws_rds_cluster" "default" {
  cluster_identifier   = "${local.project-prefix}-cluster"
  engine               = "aurora-mysql"
  engine_version       = "5.7.mysql_aurora.2.03.2"
  db_subnet_group_name = "${aws_db_subnet_group.default.name}"
  database_name        = replace("${local.project-prefix}-db", "-", "_")
  master_username      = var.database_username
  master_password      = var.database_password
  storage_encrypted    = true

  backup_retention_period = 7
  preferred_backup_window = "02:00-04:00"
  vpc_security_group_ids  = ["${aws_security_group.sg.id}"]
  skip_final_snapshot     = true
  copy_tags_to_snapshot   = true
  apply_immediately       = true

  tags = local.tags
}

# Create Databases in Cluster
resource "aws_rds_cluster_instance" "cluster_instances" {
  count              = var.database_count
  identifier         = "${local.project-prefix}-db-${count.index}"
  cluster_identifier = aws_rds_cluster.default.id
  instance_class     = var.database_size
  # instance_class = "db.t2.small"
  engine         = aws_rds_cluster.default.engine
  engine_version = aws_rds_cluster.default.engine_version

  tags = local.tags
}


resource "aws_db_subnet_group" "default" {
  name       = "${local.project-prefix}-db-subnet-group"
  subnet_ids = data.aws_subnet_ids.subnets.ids

  tags = local.tags
}
