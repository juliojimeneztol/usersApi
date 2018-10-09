class composertool {
    #asegura que este instalado el php antes de instalar composer
    package { 'php':
        ensure  => present
    }
    class { '::composer':
        require => Package['php'],
        command_name => 'composer',
        target_dir   => '/usr/local/bin',
        auto_update => true
    }
}