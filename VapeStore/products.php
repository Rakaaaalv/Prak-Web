<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Konfigurasi database
$host = "localhost";
$username = "root";
$password = "";
$database = "web_modul4";

// Koneksi ke database
$mysqli = new mysqli($host, $username, $password, $database);

if ($mysqli->connect_error) {
    die(json_encode(["error" => $mysqli->connect_error]));
}

// Fungsi untuk membaca data
function getProducts($mysqli) {
    if (isset($_GET['id'])) {
        $id = intval($_GET['id']);
        $stmt = $mysqli->prepare("SELECT * FROM products WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $product = $result->fetch_assoc();

        if ($product) {
            echo json_encode($product);
        } else {
            echo json_encode(["error" => "Produk dengan ID $id tidak ditemukan."]);
        }
    } else {
        $result = $mysqli->query("SELECT * FROM products");
        $products = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($products);
    }
}

// Fungsi untuk menambahkan data
function createProduct($mysqli, $data) {
    if (empty($data['nama_produk']) || !isset($data['harga_produk']) || !isset($data['jumlah_produk'])) {
        echo json_encode(["error" => "Data tidak lengkap! Pastikan semua kolom diisi."]);
        return;
    }

    $stmt = $mysqli->prepare("INSERT INTO products (nama_produk, harga_produk, jumlah_produk) VALUES (?, ?, ?)");
    $stmt->bind_param("sii", $data['nama_produk'], $data['harga_produk'], $data['jumlah_produk']);
    $stmt->execute();

    if ($stmt->error) {
        echo json_encode(["error" => $stmt->error]);
    } else {
        echo json_encode(["success" => true, "id" => $stmt->insert_id]);
    }
}

// Fungsi untuk memperbarui data
function updateProduct($mysqli, $data) {
    if (!isset($data['id']) || empty($data['nama_produk']) || !isset($data['harga_produk']) || !isset($data['jumlah_produk'])) {
        echo json_encode(["error" => "Data tidak lengkap! Pastikan semua kolom diisi."]);
        return;
    }

    $stmt = $mysqli->prepare("UPDATE products SET nama_produk = ?, harga_produk = ?, jumlah_produk = ? WHERE id = ?");
    $stmt->bind_param("siii", $data['nama_produk'], $data['harga_produk'], $data['jumlah_produk'], $data['id']);
    $stmt->execute();

    if ($stmt->error) {
        echo json_encode(["error" => $stmt->error]);
    } else {
        echo json_encode(["success" => true]);
    }
}

// Fungsi untuk menghapus data
function deleteProduct($mysqli, $data) {
    if (!isset($data['id'])) {
        echo json_encode(["error" => "ID produk tidak ditemukan."]);
        return;
    }

    $stmt = $mysqli->prepare("DELETE FROM products WHERE id = ?");
    $stmt->bind_param("i", $data['id']);
    $stmt->execute();

    if ($stmt->error) {
        echo json_encode(["error" => $stmt->error]);
    } else {
        echo json_encode(["success" => true]);
    }
}

// Mendapatkan metode HTTP
$method = $_SERVER['REQUEST_METHOD'];

// Tangani preflight request untuk CORS
if ($method === "OPTIONS") {
    http_response_code(200);
    exit;
}

// Menangani permintaan berdasarkan metode
switch ($method) {
    case "GET":
        getProducts($mysqli);
        break;

    case "POST":
        $data = json_decode(file_get_contents("php://input"), true);
        createProduct($mysqli, $data);
        break;

    case "PUT":
        $data = json_decode(file_get_contents("php://input"), true);
        updateProduct($mysqli, $data);
        break;

    case "DELETE":
        $data = json_decode(file_get_contents("php://input"), true);
        deleteProduct($mysqli, $data);
        break;

    default:
        echo json_encode(["error" => "Unsupported request method"]);
        break;
}

// Menutup koneksi
$mysqli->close();
?>
