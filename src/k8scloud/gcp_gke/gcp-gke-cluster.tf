# Terraform google cloud multi tier Kubernetes deployment

variable "region" {
    type = string
}

variable "project" {
    type = string
}

variable "workers_count" {
    type = number
}

#####################################################################
# GKE cluster Definition
resource "google_container_cluster" "virtual-microwave" {
  name     = "virtual-microwave"
  project = var.project
  location = var.region
  deletion_protection = false

  addons_config {
    network_policy_config {
      disabled = true
    }
  }

  # Specify the node pool configuration
  node_pool {
    name = "default-node-pool"
    initial_node_count = 1

    # The autoscaling block for the default node pool
    autoscaling {
      min_node_count = 1
      max_node_count = 3
    }

    node_config {
      machine_type = "n1-standard-2"
      disk_size_gb = 20
      oauth_scopes = [
        "https://www.googleapis.com/auth/devstorage.read_only",
        "https://www.googleapis.com/auth/logging.write",
        "https://www.googleapis.com/auth/monitoring",
        "https://www.googleapis.com/auth/service.management.readonly",
        "https://www.googleapis.com/auth/servicecontrol",
        "https://www.googleapis.com/auth/trace.append",
        "https://www.googleapis.com/auth/compute",
        "https://www.googleapis.com/auth/datastore",
      ]
    }
  }
}


#####################################################################
# Output for K8S
#####################################################################
output "client_certificate" {
  value     = google_container_cluster.virtual-microwave.master_auth.0.client_certificate
  sensitive = true
}

output "client_key" {
  value     = google_container_cluster.virtual-microwave.master_auth.0.client_key
  sensitive = true
}

output "cluster_ca_certificate" {
  value     = google_container_cluster.virtual-microwave.master_auth.0.cluster_ca_certificate
  sensitive = true
}

output "host" {
  value     = google_container_cluster.virtual-microwave.endpoint
  sensitive = true
}

output "cluster" {
  value     = google_container_cluster.virtual-microwave
  sensitive = true
}
