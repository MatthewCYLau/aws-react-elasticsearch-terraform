resource "aws_vpc" "vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true
  tags = {
    Name = var.app_name
  }
}

resource "aws_internet_gateway" "internet_gateway" {
  vpc_id = aws_vpc.vpc.id
}

resource "aws_subnet" "pub_subnet" {
  vpc_id            = aws_vpc.vpc.id
  cidr_block        = "10.0.0.0/24"
  availability_zone = "us-east-1b"

}
resource "aws_subnet" "pub_subnet2" {
  vpc_id            = aws_vpc.vpc.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "us-east-1a"
}

resource "aws_route_table" "public_ecs" {
  vpc_id = aws_vpc.vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.internet_gateway.id
  }
}

resource "aws_route_table_association" "route_table_association" {
  subnet_id      = aws_subnet.pub_subnet.id
  route_table_id = aws_route_table.public_ecs.id
}

resource "aws_route_table_association" "route_table_association2" {
  subnet_id      = aws_subnet.pub_subnet2.id
  route_table_id = aws_route_table.public_ecs.id
}

resource "aws_security_group" "lb" {
  name        = "lb-sg"
  vpc_id      = aws_vpc.vpc.id
  description = "controls access to the Application Load Balancer (ALB)"

  ingress {
    protocol    = "tcp"
    from_port   = 80
    to_port     = 80
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "ecs_tasks" {
  name        = "ecs-tasks-sg"
  vpc_id      = aws_vpc.vpc.id
  description = "allow inbound access from the ALB only"

  ingress {
    protocol        = "tcp"
    from_port       = 3001
    to_port         = 3001
    cidr_blocks     = ["0.0.0.0/0"]
    security_groups = [aws_security_group.lb.id]
  }
  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# VPC for Elasticsearch cluster

resource "aws_vpc" "demo" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true

  tags = {
    Name = "${local.common_prefix}-vpc"
  }
}

resource "aws_subnet" "public_1" {
  vpc_id                  = aws_vpc.demo.id
  cidr_block              = cidrsubnet(aws_vpc.demo.cidr_block, 8, 0)
  availability_zone       = data.aws_availability_zones.available.names[0]
  map_public_ip_on_launch = true

  tags = {
    Name = "${local.common_prefix}-public-subnet-${data.aws_availability_zones.available.names[0]}"
  }
}

resource "aws_subnet" "public_2" {
  vpc_id                  = aws_vpc.demo.id
  cidr_block              = cidrsubnet(aws_vpc.demo.cidr_block, 8, 1)
  availability_zone       = data.aws_availability_zones.available.names[1]
  map_public_ip_on_launch = true

  tags = {
    Name = "${local.common_prefix}-public-subnet-${data.aws_availability_zones.available.names[1]}"
  }
}



resource "aws_internet_gateway" "demo" {
  vpc_id = aws_vpc.demo.id

  tags = {
    Name = "${local.common_prefix}-igw"
  }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.demo.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.demo.id
  }

  tags = {
    Name = "${local.common_prefix}-public-rt"
  }
}

resource "aws_route_table_association" "public_1" {
  subnet_id      = aws_subnet.public_1.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "public_2" {
  subnet_id      = aws_subnet.public_2.id
  route_table_id = aws_route_table.public.id
}


resource "aws_subnet" "nated_1" {
  vpc_id            = aws_vpc.demo.id
  cidr_block        = cidrsubnet(aws_vpc.demo.cidr_block, 8, 3)
  availability_zone = data.aws_availability_zones.available.names[0]

  tags = {
    Name = "${local.common_prefix}-nated-subnet-${data.aws_availability_zones.available.names[0]}"
  }
}

resource "aws_subnet" "nated_2" {
  vpc_id            = aws_vpc.demo.id
  cidr_block        = cidrsubnet(aws_vpc.demo.cidr_block, 8, 4)
  availability_zone = data.aws_availability_zones.available.names[1]

  tags = {
    Name = "${local.common_prefix}-nated-subnet-${data.aws_availability_zones.available.names[1]}"
  }
}


resource "aws_eip" "nat_gw_eip_1" {
  vpc = true
}

resource "aws_eip" "nat_gw_eip_2" {
  vpc = true
}


resource "aws_nat_gateway" "gw_1" {
  allocation_id = aws_eip.nat_gw_eip_1.id
  subnet_id     = aws_subnet.public_1.id
}

resource "aws_nat_gateway" "gw_2" {
  allocation_id = aws_eip.nat_gw_eip_2.id
  subnet_id     = aws_subnet.public_2.id
}


resource "aws_route_table" "nated_1" {
  vpc_id = aws_vpc.demo.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.gw_1.id
  }

  tags = {
    Name = "${local.common_prefix}-nated-rt-1"
  }
}

resource "aws_route_table" "nated_2" {
  vpc_id = aws_vpc.demo.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.gw_2.id
  }

  tags = {
    Name = "${local.common_prefix}-nated-rt-2"
  }
}


resource "aws_route_table_association" "nated_1" {
  subnet_id      = aws_subnet.nated_1.id
  route_table_id = aws_route_table.nated_1.id
}

resource "aws_route_table_association" "nated_2" {
  subnet_id      = aws_subnet.nated_2.id
  route_table_id = aws_route_table.nated_2.id
}