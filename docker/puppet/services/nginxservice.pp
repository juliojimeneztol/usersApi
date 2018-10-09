class nginxservice {
    class { 'nginx': sendfile => off }
    user {  
        "nginx": 
            ensure     => present,
            gid        => "nginx",
            groups     => ["docker","apache"],
            require    => [Group['nginx'],Group['docker']]
    }
    user { 
        "docker":
            ensure     => present,
            gid        => "docker",
            groups     => ["docker","nginx","apache"],
            require    => [Group['nginx'],Group['docker'],Group['apache']]
    }
    group {"nginx":   ensure => present}
    group {"docker":  ensure => present}
    group {"apache":  ensure => present}
}