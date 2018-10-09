
class mysqlservice {

	class { '::mysql::server':
        root_password           => 'password',
        remove_default_accounts => true,
        service_enabled         => true,
      }

  mysql::db { 'gigigo':
    user     => 'gigigo',
    password => 'password',
    host     => 'localhost',
    grant    => ['SELECT', 'UPDATE'],
    sql      => '/etc/puppet/db/gigigo.sql',
  }
}